import json
from typing import Iterator
import uuid
from flask import Flask
from time import sleep
from concurrent.futures import ThreadPoolExecutor
import DataBase
import re
import string

from flask import Flask, render_template
from flask import *
import json
import requests
from dm_pb2 import DmSegMobileReply
from google.protobuf.json_format import MessageToJson, Parse
import jieba
from pyecharts.charts import Geo,Bar,Pie,WordCloud,Boxplot,Line,Map
from pyecharts import options
from pyecharts.globals import SymbolType
class Data:
    DataBase=None
    data={}#弹幕与评论数据,请求ID为键，数据为值
# 创建线程池执行器
executor = ThreadPoolExecutor(10)
app = Flask(__name__)

##########################################################################
######################     Flask接口           ###########################
##########################################################################
#POST接口，提交任务——获取弹幕数据
@app.route('/submit_task_get_danmaku_data/<BVID>/',methods=["POST"])
def submit_task_get_danmaku_data(BVID):
    requestID=str(uuid.uuid4())
    executor.submit(long_task_of_get_danmaku_data,requestID,BVID)#创建异步获取弹幕长任务
    submit_task_record_to_SQLite('get_danmaku_data',requestID)#提交任务记录到数据库
    return json.dumps([{
        'requestID':requestID ,
        'status': 'create_danmaku_task_success'
    }])
#GET接口，获取弹幕数据
@app.route('/get_danmaku_data/<requestID>/')
def get_danmaku_data(requestID):
    if str(requestID) in Data.data:
        return Data.data[str(requestID)]
    else:
        return json.dumps([{
        'requestID':requestID ,
        'status':"danmaku_data_don't_exist"
    }]) 
##############################################################
#POST接口，提交任务获取TOP数据
@app.route('/submit_task_get_TOP20_data', methods=["POST"])
def submit_task_get_TOP20_data():
    requestID=str(uuid.uuid4())
    executor.submit(long_task_of_get_TOP20_data,requestID)#创建异步获取弹幕长任务
    submit_task_record_to_SQLite('get_TOP20_data',requestID)#提交任务记录到数据库
    return json.dumps([{
        'requestID':requestID ,
        'status': 'create_TOP20_task_success'
    }])
#GET接口，获取TOP数据
@app.route('/get_TOP20_data/<requestID>/')
def get_TOP20_data(requestID):
    if str(requestID) in Data.data:
        return Data.data[requestID]
    else:
        return json.dumps([{
        'requestID':requestID ,
        'status':"TOP20_data_don't_exist" 
    }]) 
##############################################################
#POST接口，获取评论数据
@app.route('/submit_task_get_reply_data/<aid>/', methods=["POST"])
def submit_task_get_reply_data(aid):
    requestID=str(uuid.uuid4())
    executor.submit(long_task_of_get_reply_data,requestID,aid)#创建异步获取弹幕长任务
    submit_task_record_to_SQLite('get_reply_data',requestID)#提交任务记录到数据库
    return json.dumps([{
        'requestID':requestID ,
        'status': 'create_reply_task_success'
    }])
#GET接口，获取评论数据
@app.route('/get_reply_data/<requestID>/')
def get_reply_data(requestID):
    if str(requestID) in Data.data:
        return Data.data[requestID]
    else:
        return json.dumps([{
        'requestID':requestID ,
        'status':"reply_data_don't_exist"
    }])
##############################################################
#POST接口，提交任务保存所有数据
@app.route('/submit_task_save_all_data/<data>/', methods=["POST"])
def submit_task_save_all_data(data):
    data=str(data).split("@");
    bvid=data[0];
    requestID_danmaku=data[1];
    requestID_reply=data[2];
    requestID=str(uuid.uuid4());
    if str(requestID_danmaku) not in Data.data or str(requestID_reply) not in Data.data:
        return json.dumps([{
        'requestID':requestID,
        'status': 'create_save_all_data_task_fail'
    }])
    else:
        executor.submit(long_task_of_submit_task_save_all_data,requestID,bvid,requestID_danmaku,requestID_reply)#创建异步获取弹幕长任务
        submit_task_record_to_SQLite('save_all_data',requestID)#提交任务记录到数据库
        return json.dumps([{
            'requestID':requestID ,
            'status': 'create_save_all_data_task_success'
        }])
##############################################################
#GET接口，获取长任务执行状态
@app.route('/get_task_status/<requestID>/')
def get_long_task_status(requestID):
    return json.dumps([{
        'requestID':requestID ,
        'status':query_task_record_to_SQLite(requestID)
    }])
######################   网页模板GET接口   ###########################    
#####################################################################  
@app.route('/', methods=["GET"])
def home():
    return render_template('index.html')
@app.route('/TOP20', methods=["GET"])
def TOP20():
    return render_template('TOP20.html')
##############################################################
#GET接口，获取弹幕词云数据
@app.route('/get_danmaku_wordCloud/<requestID>/', methods=["GET"])#得到词云
def get_danmaku_wordCloud(requestID):
    if str(requestID) not in Data.data:
        return "<h1>警告！弹幕任务未完成，或数据已丢失！</h1>"
    ####开始处理####
    dist=""
    for i in Data.data[requestID]:
        dist=dist+i["content"]+" "
    pattern = re.compile(u"([\u4e00-\u9fff]+)")#正则表达式去除非中文字符
    dist= pattern.findall(dist)
    dist="".join(dist)
    # print(dist)
    seg_list =jieba.lcut(dist)
    # print(seg_list)
    wordcount = {}
    for word in seg_list:
        if len(word)>1:
            wordcount[word] = wordcount.get(word, 0)+1
    sorted_words=sorted(wordcount.items(), key=lambda x: x[1], reverse=True)[:100]#排序后词语
    #######生成词云图##########
    wordCloud=(WordCloud()
    .add("",sorted_words,word_size_range=[10,100],shape=SymbolType.DIAMOND)
    .set_global_opts(title_opts=options.TitleOpts(title="弹幕关键词TOP100")))
    wordCloud.render(path="danmaku_wordCloud.html")
    #######生成词云图##########
    return open("danmaku_wordCloud.html", "r").read()
    ####结束处理####
##############################################################
#GET接口，获取评论词云数据
@app.route('/get_reply_wordCloud/<requestID>/', methods=["GET"])#得到词云
def get_reply_wordCloud(requestID):
    if str(requestID) not in Data.data:
        return "<h1>警告！评论任务未完成，或数据已丢失！</h1>"
    ####开始处理####
    dist=""
    for i in Data.data[requestID]:
        dist=dist+i["评论"]+" "
    pattern = re.compile(u"([\u4e00-\u9fff]+)")#正则表达式去除非中文字符
    dist= pattern.findall(dist)
    dist="".join(dist)
    # print(dist)
    seg_list =jieba.lcut(dist)
    # print(seg_list)
    wordcount = {}
    for word in seg_list:
        if len(word)>1:
            wordcount[word] = wordcount.get(word, 0)+1
    sorted_words=sorted(wordcount.items(), key=lambda x: x[1], reverse=True)[:100]#排序后词语
    #######生成词云图##########
    wordCloud=(WordCloud()
    .add("",sorted_words,word_size_range=[10,100],shape=SymbolType.DIAMOND)
    .set_global_opts(title_opts=options.TitleOpts(title="评论关键词TOP100")))
    wordCloud.render(path="reply_wordCloud.html")
    #######生成词云图##########
    return open("reply_wordCloud.html", "r").read()
    ####结束处理####

##########################################################################
######################     数据库操作           ###########################
##########################################################################
#提交记录写入到数据库
def submit_task_record_to_SQLite(task_name,requestID):
    SQL="insert into main.task_record(id,task_name,requestID,status) values('%s','%s','%s','%s')"%(str(uuid.uuid4()),task_name,requestID,'waiting')
    Data.DataBase.Execute(SQL)
#到数据库查询提交记录
def query_task_record_to_SQLite(requestID):
    count=Data.DataBase.Query("select count(*) as count from main.task_record where requestID='%s'"%(requestID))[0][0]
    if count>=1:
        SQL="select status from main.task_record where requestID='%s' limit 1"%(requestID)
        return Data.DataBase.Query(SQL)[0][0]
    else:
        return "no_task_record"
#更新记录状态到数据库
def update_task_record_status_to_SQLite(requestID,status):
    SQL="update main.task_record set status='%s' where requestID='%s'"%(status,requestID)
    Data.DataBase.Execute(SQL)
def Query(SQL):
    return Data.DataBase.Query(SQL)
def Execute(SQL):
    Data.DataBase.Execute(SQL)
##########################################################################
######################     长任务处理           ###########################
##########################################################################
def long_task_of_get_danmaku_data(requestID,BVID):
    try:
        resp = requests.get("https://api.bilibili.com/x/player/pagelist?bvid=" + BVID + "&jsonp=jsonp")#根据BVID得到cid
        data_dict = json.loads(resp.content.decode("utf8"))#结果解码
        cid=str(data_dict["data"][0]["cid"])
        resp = requests.get('http://api.bilibili.com/x/v2/dm/web/seg.so?type=1&oid='+cid+'&segment_index=1')
        DM = DmSegMobileReply()#解密弹幕数据
        DM.ParseFromString(resp.content)
        data_dict = json.loads(MessageToJson(DM))["elems"]#弹幕结果列表
        Data.data[requestID]=data_dict#保存数据

        update_task_record_status_to_SQLite(requestID,'get_danmaku_data_done')#更新任务状态为执行成功
    except Exception as e:
        print("异常",e)
        return
    print("long_task_of_get_danmaku_data is done!")

def long_task_of_get_reply_data(requestID,aid):
    print("任务创建成功")
    reply_data=[]#评论容器
    for i in range(1):
        print(i)
        try:
            resp = requests.get("https://api.bilibili.com/x/v2/reply/main?csrf=&mode=3&next=" +str(i)+ "&oid=" + aid + "&plat=1&seek_rpid=&type=1")
            data_dict = json.loads(resp.content.decode("utf8")).get("data","none").get("replies","none")#结果解码
            for index, value in enumerate(data_dict):#遍历评论，共20条
                # print("第",index,"条","共",len(data_dict))
                rpid = value.get("rpid","none");ctime = value.get("ctime","none");like = value.get("clike","none");
                message =value.get("content","none").get("message","none");avater =value.get("member","none").get("avatar","none");
                level =value.get("member","none").get("level_info","none").get("current_level","none");sex =value.get("sex","none");
                uname =value.get("uname","none");sign =value.get("sign","none");
                
                if message.find(":") != -1 and message.find("https") == -1:
                    message = message.split(":")[1]
                pattern = re.compile(u"([\u4e00-\u9fff]+)")#正则表达式去除非中文字符
                message= pattern.findall(message)
                message="".join(message)
                # print(message)#################
                reply_data.append({"rpid": rpid,"评论": message,"时间": ctime,"点赞": like,"头像": avater,"等级": level,"性别": sex,"用户名": uname,"个性签名": sign})
                # print({"rpid": rpid,"评论": message,"时间": ctime,"点赞": like,"头像": avater,"等级": level,"性别": sex,"用户名": uname,"个性签名": sign})
                try:
                    resp_ = requests.get("https://api.bilibili.com/x/v2/reply/reply?csrf=&oid=262995792&pn=1&ps=10&root=" + str(rpid) + "&type=1")
                    data_dict_=json.loads(resp_.content.decode("utf8")).get("data","none").get("replies","none")
                    for index,value in enumerate(data_dict_):
                        # print("---------------",index,"--------------------------","总共",len(data_dict_))
                        rpid = value.get("rpid","none");ctime = value.get("ctime","none");like = value.get("clike","none");
                        message =value.get("content","none").get("message","none");avater =value.get("member","none").get("avatar","none");
                        level =value.get("member","none").get("level_info","none").get("current_level","none");sex =value.get("sex","none");
                        uname =value.get("uname","none");sign =value.get("sign","none");

                        if message.find(":") != -1 and message.find("https") == -1:
                            message = message.split(":")[1]
                        pattern = re.compile(u"([\u4e00-\u9fff]+)")#正则表达式去除非中文字符
                        message= pattern.findall(message)
                        message="".join(message)
                        # print(message)############
                        reply_data.append({"rpid": rpid,"评论": message,"时间": ctime,"点赞": like,"头像": avater,"等级": level,"性别": sex,"用户名": uname,"个性签名": sign})
                        # print({"rpid": rpid,"评论": message,"时间": ctime,"点赞": like,"头像": avater,"等级": level,"性别": sex,"用户名": uname,"个性签名": sign})
                except:
                    print("异常02")
                    continue            
        except:
            print("异常01")
            continue

    # print("结束")        
    # print(reply_data)
    # data_dict = json.loads(reply_data)#评论结果列表
    Data.data[requestID]=reply_data#保存数据
    
    update_task_record_status_to_SQLite(requestID,'get_reply_data_done')#更新任务状态为执行成功
    print("long_task_of_get_reply_data is done!")
def long_task_of_get_TOP20_data(requestID):
    try:
        resp = requests.get("https://api.bilibili.com/x/web-interface/popular?ps=20&pn=1",verify=False)
        data_dict =json.loads(resp.content.decode("utf8")).get("data","none").get("list","none")
        Data.data[requestID]=data_dict#保存数据
        update_task_record_status_to_SQLite(requestID,'get_TOP20_data_done')#更新任务状态为执行成功
    except Exception as e:
        print("异常",e)
        return
    print("long_task_of_get_TOP20_data is done!")
def long_task_of_submit_task_save_all_data(requestID,BVID,requestID_danmaku,requestID_reply):
    if requestID=="" or BVID=="" or requestID_danmaku=="" or requestID_reply=="":
        print("空参数异常")
        update_task_record_status_to_SQLite(requestID,'save_all_data_fail')#更新任务状态为执行失败
        return
    # print("-------------------------------------requestID=",requestID,"|BVID=",BVID,"|requestID_danmaku=",requestID_danmaku,"|requestID_reply=",requestID_reply)    
############################保存弹幕数据################################
    
    SQL="SELECT COUNT(*) as count from record where BVID='%s' and type='danmaku' "%(BVID)
    # print("-------------------------------------SQL=",SQL)
    try:
        result=Data.DataBase.Query(SQL)[0][0]
        if(result>=1):
            print("重复数据已拦截danmaku",result,"---SQL==",SQL)
            update_task_record_status_to_SQLite(requestID,'save_all_data_fail')#更新任务状态为执行失败
            return
    except Exception as e:
        print("异常",e)
        return
    try:
        SQL="INSERT INTO main.record (id,BVID,type) VALUES ('%s','%s','%s') "%(uuid.uuid4(),BVID,'danmaku')  
        Execute(SQL)  
        for i in Data.data[str(requestID_danmaku)]:
            pattern = re.compile(u"([\u4e00-\u9fff]+)")#正则表达式去除非中文字符
            content="".join(pattern.findall(i["content"]))
            SQL="INSERT INTO main.data (id,type,BVID,user,create_time,contents,score) VALUES ('%s','%s','%s','%s','%s','%s','%s')"%(uuid.uuid4(),"danmaku",BVID,"",i["ctime"],content,"")
            Data.DataBase.Execute(SQL)
    except Exception as e:
        print("异常",e)
        return

############################保存评论数据################################
    SQL="SELECT COUNT(*) as count from main.record where BVID='%s' and type='reply' "%(BVID)
    try:
        if(Data.DataBase.Query(SQL)[0][0]>=1):
            print("重复数据已拦截reply")
            update_task_record_status_to_SQLite(requestID,'save_all_data_fail')#更新任务状态为执行失败
            return
    except Exception as e:
        print("异常",e)
        return
    try:
        SQL="INSERT INTO main.record (id,BVID,type) VALUES ('%s','%s','%s') "%(uuid.uuid4(),BVID,'reply')  
        Data.DataBase.Execute(SQL)  
        for i in Data.data[str(requestID_reply)]:
            pattern = re.compile(u"([\u4e00-\u9fff]+)")#正则表达式去除非中文字符
            content="".join(pattern.findall(i["评论"]))
            SQL="INSERT INTO main.data (id,type,BVID,user,create_time,contents,score) VALUES ('%s','%s','%s','%s','%s','%s','%s')"%(uuid.uuid4(),"reply",BVID,"",i["时间"],content,"")
            Data.DataBase.Execute(SQL)
    except Exception as e:
        print("异常",e)
        return

    update_task_record_status_to_SQLite(requestID,'save_all_data_done')#更新任务状态为执行成功
    print("long_task_of_save_all_data is done!")    
if __name__ == '__main__':
    Data.DataBase=DataBase.DataBaseSqlite()
    Data.DataBase.Connect_DataBase()
    app.run(port="80")
