from flask import jsonify, abort


def json_abort(status_code, data=None):
    response = jsonify(data)
    response.status_code = status_code
    abort(response)

from bson.decimal128 import Decimal128
from flask.json import JSONEncoder


#for mongodb
class CustomJSONEncoder(JSONEncoder):
    def default(self, obj):
        if isinstance(obj, Decimal128):
            return float(obj.to_decimal())
        return super().default(obj)
