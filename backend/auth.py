from flask import Flask, jsonify, redirect, session, url_for

from flask_cognito_lib import CognitoAuth
from flask_cognito_lib.decorators import (
    auth_required,
    cognito_login,
    cognito_login_callback,
    cognito_logout,
)

app = Flask(__name__)
app.secret_key = "SecretKEY"
# Configuration required for CognitoAuth
app.config["AWS_REGION"] = "us-east-2"
app.config["AWS_COGNITO_USER_POOL_ID"] = "us-east-2_bXRj7cAEc"
app.config["AWS_COGNITO_DOMAIN"] = "https://testprof.auth.us-east-2.amazoncognito.com"
app.config["AWS_COGNITO_USER_POOL_CLIENT_ID"] = "1b94g6m6vmi9pmon9ictjamevq"
app.config["AWS_COGNITO_USER_POOL_CLIENT_SECRET"] = "3i2h87fqeiouodoac2l3dvhug8d7eommv35vatujgjvr3p79q99"
app.config["AWS_COGNITO_REDIRECT_URL"] = "http://localhost:5000/postlogin"
app.config["AWS_COGNITO_LOGOUT_URL"] = "http://localhost:5000/postlogout"

auth = CognitoAuth(app)


@app.route("/login")
@cognito_login
def login():
    # A simple route that will redirect to the Cognito Hosted UI.
    # No logic is required as the decorator handles the redirect to the Cognito
    # hosted UI for the user to sign in.
    # An optional "state" value can be set in the current session which will
    # be passed and then used in the postlogin route (after the user has logged
    # into the Cognito hosted UI); this could be used for dynamic redirects,
    # for example, set `session['state'] = "some_custom_value"` before passing
    # the user to this route
    pass


@app.route("/postlogin")
@cognito_login_callback
def postlogin():
    # A route to handle the redirect after a user has logged in with Cognito.
    # This route must be set as one of the User Pool client's Callback URLs in
    # the Cognito console and also as the config value AWS_COGNITO_REDIRECT_URL.
    # The decorator will store the validated access token in a HTTP only cookie
    # and the user claims and info are stored in the Flask session:
    # session["claims"] and session["user_info"].
    # Do anything after the user has logged in here, e.g. a redirect or perform
    # logic based on a custom `session['state']` value if that was set before
    # login
    return redirect(url_for("claims"))


@app.route("/claims")
@auth_required()
def claims():
    # This route is protected by the Cognito authorisation. If the user is not
    # logged in at this point or their token from Cognito is no longer valid
    # a 401 Authentication Error is thrown, which can be caught by registering
    # an `@app.error_handler(AuthorisationRequiredError)
    # If their auth is valid, the current session will be shown including
    # their claims and user_info extracted from the Cognito tokens.
    print(session)
    return jsonify(session)


@app.route("/admin")
@auth_required(groups=["admin"])
def admin():
    # This route will only be accessible to a user who is a member of all of
    # groups specified in the "groups" argument on the auth_required decorator
    # If they are not, a 401 Authentication Error is thrown, which can be caught
    # by registering an `@app.error_handler(CognitoGroupRequiredError).
    # If their auth is valid, the set of groups the user is a member of will be
    # shown.

    # Could also use: jsonify(session["user_info"]["cognito:groups"])
    return jsonify(session["claims"]["cognito:groups"])


@app.route("/logout")
@cognito_logout
def logout():
    # Logout of the Cognito User pool and delete the cookies that were set
    # on login.
    # No logic is required here as it simply redirects to Cognito.
    pass


@app.route("/postlogout")
def postlogout():
    # This is the endpoint Cognito redirects to after a user has logged out,
    # handle any logic here, like returning to the homepage.
    # This route must be set as one of the User Pool client's Sign Out URLs.
    return redirect(url_for("home"))


if __name__ == "__main__":
    app.debug = True
    app.run()
