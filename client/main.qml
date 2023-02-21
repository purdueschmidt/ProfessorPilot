import QtQuick

import QtQuick.Controls
import QtQuick.Layouts
import Authentication

ApplicationWindow {

    id: window
    width: 500
    height: 500
    visible: true

    Drawer {
        id: drawer

        width: Math.min(window.width, window.height) / 4 * 2
        height: window.height

        ListView {
            focus: true
            currentIndex: -1
            anchors.fill: parent

            delegate: ItemDelegate {
                width: parent.width
                text: model.text
                highlighted: ListView.isCurrentItem
                onClicked: {
                    drawer.close()
                    model.triggered()
                }
            }

            model: ListModel {
                ListElement {
                    text: qsTr("Course Review")
                    triggered: function(){
                        mainContentStack.clear()
                    }
                }
                ListElement {
                    text: qsTr("Professor Review")
                    triggered: function(){
                        mainContentStack.clear()
                        Qt.openUrlExternally("https://profpilot.auth.us-east-2.amazoncognito.com/login?client_id=6ftf2d5fer0tmqh18bo6lbi56f&response_type=code&scope=email+openid+phone&redirect_uri=http%3A%2F%2Flocalhost%3A30000%2FappProfessorPilot.html")

                    }
                }
                ListElement {
                    text: qsTr("Log in")
                    triggered: function(){
                        mainContentStack.clear()
                        mainContentStack.push("qrc:///Authentication/CognitoLogin.qml")

                    }
                }
            }

            ScrollIndicator.vertical: ScrollIndicator { }
        }
    }

    header: ToolBar {
        height: window.height / 10
        ToolButton {
            id: menuButton

            icon.height: parent.height / 2
            icon.width: parent.height / 2

            anchors.left: parent.left
            anchors.verticalCenter: parent.verticalCenter
            icon.source: "images/Hamburger_icon.png"
            onClicked: drawer.open()
        }
        Label {
            anchors.verticalCenter: parent.verticalCenter
            anchors.centerIn: parent
            text: "ProfessorPilot"
            font.pixelSize: 20
        }
    }
    StackView {
        id:mainContentStack
        anchors.fill: parent
    }
}

