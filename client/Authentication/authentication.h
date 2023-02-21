#ifndef AUTHENTICATION_H
#define AUTHENTICATION_H

#include <QObject>
#include <QtQml/QtQml>

class Authentication : public QObject
{
    Q_OBJECT
    QML_ELEMENT
    QML_UNCREATABLE("Authentication is an abstract base class.")
public:
    explicit Authentication(QObject *parent = nullptr);

     Q_INVOKABLE virtual bool login(QString userName, QString password) = 0;
signals:
private:
};

#endif // AUTHENTICATION_H
