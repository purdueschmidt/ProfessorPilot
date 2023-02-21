#include "cognito.h"
#include <QDebug>
Cognito::Cognito(QObject *parent)
    : Authentication{parent}
{
}

bool Cognito::login(QString userName, QString password)
{
    QString PW (password);
    QString UN (userName);
    return true;
}
