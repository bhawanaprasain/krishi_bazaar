
from selenium import webdriver
from selenium.webdriver.firefox.options import Options as FirefoxOptions
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.common.by import By

import os
import csv
from csv import DictReader
import sys
import pandas as pd

profile = webdriver.FirefoxProfile()
profile.set_preference('intl.accept_languages', 'en-GB, en')
driver = webdriver.Firefox(firefox_profile=profile)

websiteURL = "https://kalimatimarket.gov.np/lang/en"
driver.get(websiteURL)

if os.path.exists('data.csv') == True:
    os.remove('data.csv')

columns =["Name","Unit", "Minimum", "Maximum", "Average"]
filename= "data.csv"
available_data =[]
with open(filename, 'w') as csvfile:  
    # creating a csv writer object  
    csvwriter = csv.writer(csvfile)  
    # writing the columns  
    csvwriter.writerow(columns)  

tbody = WebDriverWait(driver,25).until(EC.element_to_be_clickable((By.XPATH,'/html/body/div[2]/main/section[2]/div/div[2]/div[2]/div/div/div/div/table/tbody')))
tr = tbody.find_elements_by_tag_name("tr")
for clicks in range(9):
    if clicks != 0:
        driver.find_element_by_id("commodityDailyPrice_next").click()
        tbody = WebDriverWait(driver,25).until(EC.element_to_be_clickable((By.XPATH,'/html/body/div[2]/main/section[2]/div/div[2]/div[2]/div/div/div/div/table/tbody')))
        tr = tbody.find_elements_by_tag_name("tr")
    for i in range(1,10):
        td = tr[i].find_elements_by_tag_name('td')
        details= []
        for col in range(5):
            details.append(td[col].text)
        print(details)
        with open(filename, 'a') as csvfile:  
            csvwriter = csv.writer(csvfile)  
            csvwriter.writerow(details)  
       