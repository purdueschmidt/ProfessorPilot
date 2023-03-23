from flask import (
    Blueprint
)

from api.messages.messages_service import (
    get_public_message,
    get_protected_message,
    get_admin_message
)
from api.security.guards import (
    authorization_guard,
    permissions_guard,
    admin_messages_permissions
)

bp_name = 'api-messages'
bp_url_prefix = '/api/messages'
bp = Blueprint(bp_name, __name__, url_prefix=bp_url_prefix)


@bp.route("/public")
def public():
    return vars(get_public_message())


@bp.route("/protected")
@authorization_guard
def protected():
    return vars(get_protected_message())


@bp.route("/admin")
@authorization_guard
@permissions_guard([admin_messages_permissions.read])
def admin():
    return vars(get_admin_message())


@bp.route('/', methods=(['GET', 'POST']))
@bp.route('/home', methods=(['GET', 'POST']))
@bp.route('/submit_review', methods=['POST'])
@authorization_guard
def home():
    if request.method == 'POST':
        data = request.get_json()
        response, status_code = submit_review(data)
        return jsonify(response), status_code
    else:
        # Return some other response for GET requests (if needed)
        pass