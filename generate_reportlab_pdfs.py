import os
from reportlab.lib.pagesizes import landscape
from reportlab.lib import colors
from reportlab.pdfgen import canvas
from reportlab.platypus import SimpleDocTemplate, Paragraph, Spacer, PageBreak
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle

def draw_slide_background(canvas_obj, doc):
    canvas_obj.saveState()
    # Dark modern slide canvas background (16:9 widescreen: 960 x 540 pt)
    canvas_obj.setFillColor(colors.HexColor('#0f172a'))
    canvas_obj.rect(0, 0, 960, 540, fill=1, stroke=0)
    
    # Top accent header bar
    canvas_obj.setFillColor(colors.HexColor('#3b82f6'))
    canvas_obj.rect(0, 528, 960, 12, fill=1, stroke=0)
    
    # Bottom footer bar
    canvas_obj.setFillColor(colors.HexColor('#1e293b'))
    canvas_obj.rect(0, 0, 960, 40, fill=1, stroke=0)
    
    # Footer text
    canvas_obj.setFillColor(colors.HexColor('#94a3b8'))
    canvas_obj.setFont("Helvetica-Bold", 10)
    canvas_obj.drawString(40, 15, "BIOLOGY TEACHING PLATFORM • THU VIEN BAI GIANG SINH HOC")
    canvas_obj.drawRightString(920, 15, f"Trang {canvas_obj._pageNumber}")
    
    canvas_obj.restoreState()

def create_pdf_presentation(filename, title_main, slides_data):
    # Widescreen 16:9 page size (960 x 540 pt)
    widescreen = (960, 540)
    doc = SimpleDocTemplate(
        filename,
        pagesize=widescreen,
        leftMargin=50,
        rightMargin=50,
        topMargin=50,
        bottomMargin=60
    )

    styles = getSampleStyleSheet()
    
    title_style = ParagraphStyle(
        'SlideTitle',
        parent=styles['Heading1'],
        fontName='Helvetica-Bold',
        fontSize=26,
        leading=32,
        textColor=colors.HexColor('#f8fafc'),
        spaceAfter=20
    )
    
    subtitle_style = ParagraphStyle(
        'SlideSubtitle',
        parent=styles['Normal'],
        fontName='Helvetica-Bold',
        fontSize=14,
        leading=18,
        textColor=colors.HexColor('#38bdf8'),
        spaceAfter=15
    )

    bullet_style = ParagraphStyle(
        'SlideBullet',
        parent=styles['Normal'],
        fontName='Helvetica',
        fontSize=16,
        leading=24,
        textColor=colors.HexColor('#e2e8f0'),
        leftIndent=20,
        firstLineIndent=-10,
        spaceAfter=12
    )

    story = []
    
    for i, (slide_title, bullets) in enumerate(slides_data):
        story.append(Paragraph(title_main.upper(), subtitle_style))
        story.append(Paragraph(slide_title, title_style))
        story.append(Spacer(1, 10))
        
        for bullet in bullets:
            story.append(Paragraph(f"• {bullet}", bullet_style))
            
        if i < len(slides_data) - 1:
            story.append(PageBreak())

    doc.build(story, onFirstPage=draw_slide_background, onLaterPages=draw_slide_background)
    print(f"Generated valid ReportLab PDF slide deck: {filename}")

decks = [
    ("document/slide/bai-1-quang-hop-o-thuc-vat.pdf", "Bai 1: Quang Hop O Thuc Vat", [
        ("1. Khai Niem Quang Hop", [
            "Quang hop la qua trinh su dung nang luong anh sang mat troi bien doi CO2 va H2O.",
            "Tao thanh Hop chat huu co (Glucose) va giai phong O2 vao khi quyen.",
            "Phuong trinh tong quat: 6 CO2 + 6 H2O -> C6H12O6 + 6 O2."
        ]),
        ("2. Vai Tro Cua Quang Hop", [
            "Cung cap nguon thuc an va nang luong cho toan bo sinh gioi tren Trai Dat.",
            "Cung cap Oxi phuc vu cho qua trinh ho hap cua cac sinh vat.",
            "Dieu hoa khong khi, giam hieu ung nha kinh va bao ve moi truong."
        ]),
        ("3. La Cay - Co Quan Quang Hop", [
            "Dien tich be mat la lon giup hap thu toi da anh sang mat troi.",
            "Tebao la chua nhieu Luc lap (Chloroplast) la bao quan thuc hien quang hop.",
            "Chat diep luc (Chlorophyll) hap thu anh sang mau do va xanh tim."
        ]),
        ("4. Hai Pha Cua Quang Hop", [
            "Pha sang: Dien ra o màng thylakoid, su dung nang luong anh sang tao ATP va NADPH.",
            "Pha toi: Dien ra o stroma, co dinh CO2 theo chu trinh Calvin de tao Glucose."
        ])
    ]),
    ("document/slide/bai-1-nguyen-to-hoa-hoc-va-nuoc.pdf", "Bai 1: Cac Nguyen To Hoa Hoc Va Nuoc", [
        ("1. Cac Nguyen To Hoa Hoc Trong Te Bao", [
            "Co khoang 25 nguyen to hoa hoc thiet yeu tham gia cau tao nen co the song.",
            "Nguyen to da luong (C, H, O, N, P, S...): Tham gia cau tao nen cac dai phan tu sinh hoc.",
            "Nguyen to vi luong (Fe, Zn, Cu, I, Mn...): Tham gia cau tao enzyme va hormone."
        ]),
        ("2. Vai Tro Cua Nuoc Trong Te Bao", [
            "Nuoc la thanh phan cau tao chính chiem 70-90% khoi luong te bao.",
            "Nuoc la dung moi hoa tan nhieu chất va la moi truong cho cac phan ung sinh hoa.",
            "Nuoc giup dieu hoa nhiệt do co thể va tham gia van chuyen cac chat."
        ])
    ]),
    ("document/slide/bai-3-cau-truc-te-bao-nhan-thuc.pdf", "Bai 3: Cau Truc Te Bao Nhan Thuc", [
        ("1. Dac Diem Chung Cua Te Bao Nhan Thuc", [
            "Co nhan chinh thuc voi mang nhan bao bọc bao ve vat chat di truyen ADN.",
            "He thong noi mang chia te bao thanh cac xoang chuc nang rieng biet.",
            "Chua nhieu bao quan co mang bao bọc nhu Ti the, Luc lap, Bo may Golgi."
        ]),
        ("2. Cac Bao Quan Chuc Nang Chinh", [
            "Nhan te bao: Trung tam dieu khien moi hoat dong song cua te bao.",
            "Ti the: Tram nang luong cua te bao, noi tong hop phan lon ATP.",
            "Luc lap: Bao quan thuc hien quang hop o te bao thuc vat.",
            "Luoi noi chat & Bo may Golgi: Tong hop, biendoi va van chuyen protein."
        ])
    ]),
    ("document/slide/bai-4-chu-ky-te-bao-va-nguyen-phan.pdf", "Bai 4: Chu Ky Te Bao Va Nguyen Phan", [
        ("1. Chu Ky Te Bao", [
            "Ky trung gian: G1 (Tang truong), S (Nhan doi ADN & NST), G2 (Chuan bi phan chia).",
            "Pha M (Phan chia): Nguyen phan chia nhan va phan chia te bao chat."
        ]),
        ("2. Cac Ky Cua Nguyen Phan", [
            "Ky dau: Nhiem sac the co xoan, mang nhan va nhan con bien mat.",
            "Ky giua: NST co xoan cuc dai va xep thanh 1 hang o mat phang xich dao.",
            "Ky sau: Cac cromatit chi em tach nhau ve 2 cuc cua te bao.",
            "Ky cuoi: Mang nhan xuat hien tro lai, te bao chat phan chia tao 2 te bao con."
        ])
    ]),
    ("document/slide/bai-1-gen-ma-di-truyen.pdf", "Bai 1: Gen, Ma Di Truyên & Nhan Doi ADN", [
        ("1. Khai Niem Vang Cau Truc Cua Gen", [
            "Gen la mot doan phan tu ADN mang thong tin ma hoa mot san pham xac dinh.",
            "Cau truc chung cua gen gom 3 vùng: Vung dieu hoa -> Vung ma hoa -> Vung ket thuc."
        ]),
        ("2. Ma Di Truyen", [
            "Ma di truyen la ma bo ba (Codon) tren mARN doc theo chieu 5' -> 3'.",
            "Co 64 bo ba: 61 bo ba ma hoa 20 loai axit amin, 3 bo ba ket thuc (UAA, UAG, UGA).",
            "Đac tinh: Tinh pho bien, tinh thoai hoa va tinh dac hieu."
        ]),
        ("3. Qua Trinh Nhan Doi ADN", [
            "Dien ra trong nhan te bao tai ky trung gian (pha S).",
            "Dien ra theo nguyen tac bo sung (A-T, G-X) va nguyen tac ban bao ton.",
            "Enzyme ADN polymerase tong hop chuoi moi lien tuc theo chieu 5' -> 3'."
        ])
    ]),
    ("document/slide/Le-cuoi.pdf", "Slide Bai Giang: Le Cuoi Va Van Hoa Sinh Hoc", [
        ("1. Tong Quan Bai Giang", [
            "Gioi thieu nghi le truyen thong va y nghia van hoa gia dinh.",
            "Tich hop kien thuc truyen thong va sinh hoc duy tri the he."
        ]),
        ("2. Cac Buoc Nghi Le", [
            "Le dam ngo, le an hoi va le thanh hon.",
            "Y nghia ket noi gia dinh va truyen thong van hoa Viet Nam."
        ])
    ])
]

os.makedirs("document/slide", exist_ok=True)
os.makedirs("public/document/slide", exist_ok=True)

for path, title, slides in decks:
    create_pdf_presentation(path, title, slides)
    pub_path = os.path.join("public", path)
    create_pdf_presentation(pub_path, title, slides)

print("All PDF presentations generated with 100% valid PDF spec using ReportLab!")
