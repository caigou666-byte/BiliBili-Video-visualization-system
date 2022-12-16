import sqlite3
import os
import threading
class DataBaseSqlite:
    DataBaseFileName="data.db"
    Connect=None
    Cursor=None
    lock = threading.Lock()
    def DataBaseIsExist(self):
        return os.path.exists("data.db") 
    def Connect_DataBase(self):
        if self.DataBaseIsExist==False:
            return False
        self.Connect = sqlite3.connect(self.DataBaseFileName,check_same_thread=False)
        self.Cursor = self.Connect.cursor() 
    def Query(self,SQL):
        try:
            self.lock.acquire(True)
            self.Cursor.execute(SQL)
            return self.Cursor.fetchall()
        finally:
            self.lock.release()    
    def Execute(self,SQL):
        try:
            self.lock.acquire(True)
            self.Cursor.execute(SQL)
            self.Connect.commit()
        finally:
            self.lock.release()
    def Close(self):
        self.Connect.close()