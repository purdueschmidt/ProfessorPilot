qt_add_library(authentication STATIC)

qt_add_qml_module(authentication
    URI Authentication
    VERSION 0.1
    QML_FILES CognitoLogin.qml
    SOURCES
        authentication.cpp
        authentication.h
        cognito.cpp
        cognito.h
)


target_link_libraries(authentication
    PRIVATE Qt6::Quick)

target_include_directories(authentication PUBLIC ${CMAKE_CURRENT_SOURCE_DIR})


