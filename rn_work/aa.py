import pandas as pd
import requests
from bs4 import BeautifulSoup

base_url = "https://www.dghma.org/pg/bbs/board.php?bo_table=recruit_new_2&page={}"

all_rows = []

for page in range(1, 101):
    url = base_url.format(page)
    res = requests.get(url)
    res.encoding = 'utf-8'
    soup = BeautifulSoup(res.text, "html.parser")
    bo_list = soup.find("div", id="bo_list")
    if not bo_list:
        continue
    tbody = bo_list.find("tbody")
    if not tbody:
        continue
    for row in tbody.find_all("tr"):
        cols = row.find_all("td")
        if len(cols) < 6:
            continue
        job_info = cols[1].get_text(strip=True)
        apt_name = cols[2].get_text(strip=True)
        location = cols[3].get_text(strip=True)
        reg_date = cols[4].get_text(strip=True)
        end_date = cols[5].get_text(strip=True)
        all_rows.append([job_info, apt_name, location, reg_date, end_date])

columns = ["채용정보", "아파트명", "근무지", "등록일", "마감일"]
df = pd.DataFrame(all_rows, columns=columns)
print(df)
df.to_csv("채용정보.csv", index=False)