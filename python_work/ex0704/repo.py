
from reportlab.lib.pagesizes import A4
from reportlab.platypus import (
    SimpleDocTemplate, Paragraph, Spacer, Table, TableStyle
)
from reportlab.lib import colors
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont
from reportlab.lib.units import mm
from reportlab.lib.fonts import addMapping

# ✅ 한글 폰트 등록
pdfmetrics.registerFont(TTFont('NanumGothic', 'NanumGothic.ttf'))
pdfmetrics.registerFont(TTFont('NanumGothic-Bold', 'NanumGothicBold.ttf'))
pdfmetrics.registerFont(TTFont('NanumGothic-Light', 'NanumGothicLight.ttf'))
addMapping('NanumGothic', 0, 0, 'NanumGothic')
addMapping('NanumGothic', 0, 1, 'NanumGothic-Bold')

# ✅ 스타일 정의
styles = getSampleStyleSheet()
styles["Normal"].fontName = 'NanumGothic'
styles["Heading1"].fontName = 'NanumGothic-Bold'
styles["Heading2"].fontName = 'NanumGothic-Bold'

code_style = ParagraphStyle(
    'CodeStyle',
    fontName='NanumGothic',
    fontSize=9,
    leading=12,
    backColor=colors.whitesmoke,
    borderPadding=5,
    leftIndent=5,
    rightIndent=5,
)

output_style = ParagraphStyle(
    'OutputStyle',
    fontName='NanumGothic',
    fontSize=9,
    leading=12,
    backColor=colors.aliceblue,
    borderPadding=5,
    leftIndent=5,
    rightIndent=5,
)

# ✅ PDF 문서 초기화
doc = SimpleDocTemplate("문제_풀이_디자인버전.pdf", pagesize=A4,
                        rightMargin=20, leftMargin=20, topMargin=20, bottomMargin=20)

# ✅ 예시 문제 데이터
problems = [
    {
        "num": 1,
        "title": "TotalCharges 전처리",
        "code": """data['TotalCharges'] = pd.to_numeric(data['TotalCharges'], errors='coerce')
median = data['TotalCharges'].median()
data['TotalCharges'].fillna(median, inplace=True)""",
        "output": """customerID  tenure  MonthlyCharges  TotalCharges Churn
0001        1       29.85           29.85        Yes
0002       34       56.95         1889.50        No
0003        2       53.85          959.68        Yes"""
    },
    {
        "num": 2,
        "title": "상관계수 분석",
        "code": """corr = data[['Income', 'Spending']].corr().iloc[0, 1]
result = "강한 양의 상관관계" if corr >= 0.7 else "관계 없음""",
        "output": "상관계수: 1.00 → 강한 양의 상관관계"
    }
]

elements = []

# ✅ 제목
elements.append(Paragraph("빅데이터 분석기사 실기 문제 풀이 (코드 포함)", styles['Heading1']))
elements.append(Spacer(1, 12))

# ✅ 문제 반복
for item in problems:
    elements.append(Paragraph(f"문제 {item['num']}. {item['title']}", styles['Heading2']))
    elements.append(Spacer(1, 6))

    # 코드 블럭
    elements.append(Paragraph("📌 코드:", styles["Normal"]))
    code_para = Paragraph(item["code"].strip().replace(" ", "&nbsp;").replace("\n", "<br/>"), code_style)
    code_table = Table([[code_para]], colWidths=[170 * mm])
    code_table.setStyle(TableStyle([
        ("BACKGROUND", (0, 0), (-1, -1), colors.whitesmoke),
        ("BOX", (0, 0), (-1, -1), 0.5, colors.grey),
        ("INNERPADDING", (0, 0), (-1, -1), 5),
    ]))
    elements.append(code_table)
    elements.append(Spacer(1, 6))

    # 출력 블럭
    elements.append(Paragraph("📎 출력 결과:", styles["Normal"]))
    output_para = Paragraph(item["output"].strip().replace(" ", "&nbsp;").replace("\n", "<br/>"), output_style)
    output_table = Table([[output_para]], colWidths=[170 * mm])
    output_table.setStyle(TableStyle([
        ("BACKGROUND", (0, 0), (-1, -1), colors.aliceblue),
        ("BOX", (0, 0), (-1, -1), 0.5, colors.lightblue),
        ("INNERPADDING", (0, 0), (-1, -1), 5),
    ]))
    elements.append(output_table)
    elements.append(Spacer(1, 12))

# ✅ PDF 생성
doc.build(elements)
