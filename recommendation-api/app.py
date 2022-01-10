from flask import Flask
import flask.scaffold
flask.helpers._endpoint_from_view_func = flask.scaffold._endpoint_from_view_func
from flask_restful import Api,Resource, reqparse
from model import predictCategory
import json
from getTitle import get_video_title

app= Flask(__name__)
api=Api(app)
args=reqparse.RequestParser()
args.add_argument("rooms",action='append',help="send rooms",required=True)
args.add_argument("links",action='append',help="send videoIds or videoURLs",required=True)


class Category(Resource):
    def put(self,curr_room):
        tmpArgs=args.parse_args()
        title=get_video_title(tmpArgs['links'][0])
        categories=[]
        curr_room_cat=''
        for i in range(len(tmpArgs['rooms'])):
            tmp={'name':'','category':''}
            tmp['name']=tmpArgs['rooms'][i]
            tmp['category']=str(predictCategory(get_video_title(tmpArgs['links'][i]))[0])
            if tmpArgs['rooms'][i]==curr_room:
                curr_room_cat=tmp['category']
            categories.append(tmp)
        recommendations=[]
        for room in categories:
            if room['category']==curr_room_cat and room['name']!=curr_room:
                recommendations.append(room)
        return {'recommendations':recommendations}

api.add_resource(Category,"/category/<string:curr_room>")

if __name__=="__main__":
    app.run(debug=True)
