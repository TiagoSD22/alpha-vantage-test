import datetime

class StockQuoteData:
    def __init__(self, timeStamp : datetime, openValue : float, highValue : float, lowValue : float, closeValue : float, volume : float):
        self.__timeStamp = timeStamp
        self.__open = openValue
        self.__high = highValue
        self.__low = lowValue
        self.__close = closeValue
        self.__volume = volume
    
    def getTimeStamp() :
        return self.__timeStamp
    
    def setTimeStamp(timeStamp : datetime):
        self.__timeStamp = timeStamp
    
    def getOpenValue():
        return self.__open
    
    def setOpenValue(openValue : float):
        self.__open = openValue
    
    def getHighValue():
        return self.__high
    
    def setHighValue(highValue : float):
        self.__high = highValue
    
    def getLowValue():
        return self.__low
    
    def setLowValue(lowValue : float):
        self.__low = lowValue
    
    def getCloseValue():
        return self.__close
    
    def setCloseValue(closeValue : float):
        self.__close = closeValue
    
    def getVolume():
        return self.__volume
    
    def setVolume(volume : float):
        self.__volume = volume