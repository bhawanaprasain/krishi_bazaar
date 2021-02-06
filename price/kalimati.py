# coding=utf-8
import os
import csv
from csv import DictReader
from selenium import webdriver
from selenium.webdriver.firefox.options import Options as FirefoxOptions
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.common.by import By
from selenium.common.exceptions import TimeoutException
import sys
import pandas as pd

options = FirefoxOptions()
# options.add_argument("--headless")
driver = webdriver.Firefox(options=options,executable_path="../geckodriver")
driver.get("www.google.com")
driver.quit()