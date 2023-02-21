#ifndef COGNITO_H
#define COGNITO_H

#include "authentication.h"

class Cognito : public Authentication
{
    Q_OBJECT
    QML_ELEMENT
    QML_SINGLETON

public:
    explicit Cognito(QObject *parent = nullptr);


    // Authentication interface
public:
    Q_INVOKABLE bool login(QString userName, QString password);
};

#endif // COGNITO_H
