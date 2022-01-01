from flask import Flask
import flask.scaffold
flask.helpers._endpoint_from_view_func = flask.scaffold._endpoint_from_view_func
from flask_restful import Api,Resource

app= Flask(__name__)
api=Api(app)
videos={}
class Category(Resource):
    def get(self,title):
        return {"data":name}


api.add_resource(Category,"/category/<string:title>")

if __name__=="__main__":
    app.run(debug=True)
