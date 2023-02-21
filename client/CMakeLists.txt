cmake_minimum_required(VERSION 3.16)

project(ProfessorPilot VERSION 0.1 LANGUAGES CXX)

set(CMAKE_AUTORCC ON)
set(CMAKE_AUTOMOC ON)
set(CMAKE_CXX_STANDARD_REQUIRED ON)

find_package(Qt6 6.2 COMPONENTS Quick Qml REQUIRED)

qt_add_executable(appProfessorPilot
    main.cpp
)

qt_add_qml_module(appProfessorPilot
    URI ProfessorPilot
    VERSION 0.1
    QML_FILES
        main.qml
    RESOURCES
        images/Hamburger_icon.png
)

add_subdirectory(Authentication)

target_include_directories(appProfessorPilot PRIVATE "/home/justin/emscripten-main/system/include/")

set_target_properties(appProfessorPilot PROPERTIES
    MACOSX_BUNDLE_GUI_IDENTIFIER my.example.com
    MACOSX_BUNDLE_BUNDLE_VERSION ${PROJECT_VERSION}
    MACOSX_BUNDLE_SHORT_VERSION_STRING ${PROJECT_VERSION_MAJOR}.${PROJECT_VERSION_MINOR}
    MACOSX_BUNDLE TRUE
    WIN32_EXECUTABLE TRUE
)

target_link_libraries(appProfessorPilot
    PRIVATE authenticationplugin Qt6::Quick Qt6::Qml)

install(TARGETS appProfessorPilot
    BUNDLE DESTINATION .
    LIBRARY DESTINATION ${CMAKE_INSTALL_LIBDIR})
