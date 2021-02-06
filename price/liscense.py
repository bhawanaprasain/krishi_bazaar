
from selenium import webdriver
from selenium.webdriver.firefox.options import Options as FirefoxOptions
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.common.by import By
from selenium.common.exceptions import TimeoutException
from selenium.webdriver.common.keys import Keys

options = FirefoxOptions()
# options.add_argument("--headless")
driver = webdriver.Firefox(options=options,executable_path="./geckodriver")

driver.get("https://onlineedlreg.dotm.gov.np/dlNewRegHome")

## select apply for
WebDriverWait(driver,15).until(EC.element_to_be_clickable((By.XPATH,'//table/tbody/tr[2]/td[2]/div/div/select/option[4]'))).click()

WebDriverWait(driver,15).until(EC.element_to_be_clickable((By.ID,'confirmBox'))).click()
#application number
driver.find_element_by_id('applicationNo').send_keys("123456")
# liscence number
driver.find_element_by_id('licenseNo').send_keys("123456")
#select category
WebDriverWait(driver,15).until(EC.element_to_be_clickable((By.XPATH,'//*[@id="cate4"]'))).click()
# select zone
WebDriverWait(driver,15).until(EC.element_to_be_clickable((By.XPATH,'/html/body/div[4]/div/form/div[2]/table/tbody/tr[4]/td[2]/div/div/select/option[9]'))).click()
# liscence issue office
WebDriverWait(driver,15).until(EC.element_to_be_clickable((By.XPATH,'/html/body/div[4]/div/form/div[2]/table/tbody/tr[5]/td[2]/div/div/div/select/option[2]'))).click()
WebDriverWait(driver,15).until(EC.element_to_be_clickable((By.XPATH,'//*[@id="wwctrl_imagePicker"]/img'))).click()
WebDriverWait(driver,15).until(EC.element_to_be_clickable((By.XPATH,'/html/body/div[7]/div/div[2]/div/div/select[2]'))).click()
element = driver.find_element_by_xpath('/html/body/div[7]/div/div[2]/div/div/input')
# element.clear()

element.send_keys("2053")
WebDriverWait(driver,15).until(EC.element_to_be_clickable((By.XPATH,'/html/body/div[7]/div/div[2]/div/div/select[1]/option[11]'))).click()
WebDriverWait(driver,15).until(EC.element_to_be_clickable((By.XPATH,'/html/body/div[7]/div/div[2]/div/table/tbody/tr[2]/td[7]/a'))).click()

