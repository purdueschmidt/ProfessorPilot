import QtQuick
import QtQuick.Controls
import QtQuick.Layouts
import QtQml
import Authentication 0.1 as Auth

Pane {

    ColumnLayout {
        anchors.centerIn: parent

        Label {
            Layout.alignment: Qt.AlignHCenter

            text: qsTr("Sign in with your email and password")
        }
        ColumnLayout {
            id: emailCol
            Label {
                text: qsTr("email")
            }

            TextField {
                placeholderText: qsTr("email")
                Layout.fillWidth: true
                id: userEmail
            }
        }

        ColumnLayout {
            id: passwordCol
            Label {
                text: qsTr("Password")
            }

            TextField {
                id: userpassword
                placeholderText: qsTr("Password")
                Layout.fillWidth: true
                echoMode: TextInput.Password
                passwordMaskDelay: 900

            }
        }

        Button {
            id:signinButton
            text: qsTr("Sign In")
            onClicked: {
                Auth.Authentication.Cognito.login("testUN","testPW")

            }
        }
    }

}
