import os

def create_simple_pdf(filename, title_text, slides_content):
    # PDF 1.4, landscape 16:9 slides (960 x 540 pt)
    objects = []
    
    # 1 0 obj: Catalog
    objects.append(b"1 0 obj\n<< /Type /Catalog /Pages 2 0 R >>\nendobj\n")
    
    page_ids = []
    content_ids = []
    
    cur_id = 4
    for i in range(len(slides_content)):
        page_ids.append(cur_id)
        content_ids.append(cur_id + 1)
        cur_id += 2

    # 2 0 obj: Pages
    kids_str = " ".join([f"{pid} 0 R" for pid in page_ids])
    objects.append(f"2 0 obj\n<< /Type /Pages /Kids [{kids_str}] /Count {len(page_ids)} >>\nendobj\n".encode('utf-8'))
    
    font_obj_id = cur_id
    font_str = f"{font_obj_id} 0 R"
    
    for i, (stitle, sbullets) in enumerate(slides_content):
        pid = page_ids[i]
        cid = content_ids[i]
        
        stream_lines = [
            "BT",
            "/F1 24 Tf",
            "50 470 Td",
            f"({stitle}) Tj",
            "ET",
            "BT",
            "/F1 14 Tf",
            "50 410 Td",
            "18 TL"
        ]
        
        for bullet in sbullets:
            safe_b = bullet.replace("(", "\\(").replace(")", "\\)")
            stream_lines.append(f"(- {safe_b}) Tj T*")
            
        stream_lines.extend([
            "ET",
            "BT",
            "/F1 10 Tf",
            "50 30 Td",
            f"(Trang {i+1} / {len(slides_content)} - Biology Teaching Platform) Tj",
            "ET"
        ])
        
        stream_data = "\n".join(stream_lines).encode('utf-8')
        
        page_obj = f"{pid} 0 obj\n<< /Type /Page /Parent 2 0 R /MediaBox [0 0 960 540] /Contents {cid} 0 R /Resources << /Font << /F1 {font_str} >> >> >>\nendobj\n".encode('utf-8')
        content_obj = f"{cid} 0 obj\n<< /Length {len(stream_data)} >>\nstream\n".encode('utf-8') + stream_data + b"\nendstream\nendobj\n"
        
        objects.append(page_obj)
        objects.append(content_obj)
        
    objects.append(f"{font_obj_id} 0 obj\n<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica >>\nendobj\n".encode('utf-8'))
    
    pdf_bytes = b"%PDF-1.4\n"
    offsets = []
    
    for obj in objects:
        offsets.append(len(pdf_bytes))
        pdf_bytes += obj
        
    xref_offset = len(pdf_bytes)
    pdf_bytes += f"xref\n0 {len(objects)+1}\n0000000000 65535 f \n".encode('utf-8')
    
    for off in offsets:
        pdf_bytes += f"{off:010d} 00000 n \n".encode('utf-8')
        
    pdf_bytes += f"trailer\n<< /Size {len(objects)+1} /Root 1 0 R >>\nstartxref\n{xref_offset}\n%%EOF\n".encode('utf-8')
    
    with open(filename, "wb") as f:
        f.write(pdf_bytes)
    print(f"Generated PDF slide deck: {filename}")

decks = [
    ("document/slide/bai-1-quang-hop-o-thuc-vat.pdf", "Bai 1: Quang Hop O Thuc Vat", [
        ("Khai niem Quang Hop", ["Quang hop la qua trinh su dung nang luong anh sang mat troi", "Bien doi CO2 va H2O thanh Hop chat huu co (Glucose)", "Giai phong O2 vao khi quyen"]),
        ("Vai tro cua Quang Hop", ["Cung cap thuc an cho toan bo sinh gioi", "Cung cap Oxi cho ho hap cua sinh vat", "Dieu hoa khong khi va giam hieu ung nha kinh"]),
        ("La cay - Co quan quang hop", ["Dien tich be mat lon de hap thu anh sang", "Luc lap la bao quan thuc hien quang hop", "Chat diep luc (Chlorophyll) hap thu anh sang"]),
        ("Pha sang va Pha toi", ["Pha sang: Dien ra o membrane thylakoid, tao ATP va NADPH", "Pha toi: Dien ra o stroma, co dinh CO2 theo chu trinh Calvin"])
    ]),
    ("document/slide/bai-1-nguyen-to-hoa-hoc-va-nuoc.pdf", "Bai 1: Cac Nguyen To Hoa Hoc Va Nuoc", [
        ("Nguyen to hoa hoc trong te bao", ["Co khoang 25 nguyen to thiet yeu cho song", "Nguyen to da luong: C, H, O, N, P, S...", "Nguyen to vi luong: Fe, Zn, Cu, I, Mn..."]),
        ("Vai tro cua Nuoc", ["Nuoc la thanh phan cau tao chinh cua te bao (70-90%)", "Nuoc la dung moi hoa tan nhieu chat", "Nuoc la moi truong va tham gia phan ung sinh hoa"]),
        ("Tinh chat cua Nuoc", ["Phan tu nuoc co tinh phan cuc", "Tao lien ket Hydro giua cac phan tu nuoc", "Kha nang dieu hoa nhiệt do va duy tri cai hien"])
    ]),
    ("document/slide/bai-3-cau-truc-te-bao-nhan-thuc.pdf", "Bai 3: Cau Truc Te Bao Nhan Thuc", [
        ("Dac diem chung", ["Co nhan chinh thuc voi mang nhan bao boc", "He thong noi mang chia te bao thanh cac xoang", "Chua nhieu bao quan co mang bao boc"]),
        ("Cac bao quan chinh", ["Nhan te bao: Chua vat chat di truyen (ADN)", "Ti the: Tram nang luong cua te bao (ATP)", "Luc lap: Quang hop o te bao thuc vat", "Luoi noi chat & Bo may Golgi: Tong hop va van chuyen protein"])
    ]),
    ("document/slide/bai-4-chu-ky-te-bao-va-nguyen-phan.pdf", "Bai 4: Chu Ky Te Bao Va Nguyen Phan", [
        ("Chu ky te bao", ["Ky trung gian: G1 (Tang truong), S (Nhan doi ADN), G2 (Chuan bi phan chia)", "Qua trinh Phan chia (Pha M): Nguyen phan va phan chia te bao chat"]),
        ("Cac ky cua Nguyen phan", ["Ky dau: Nhiem sac the co xoan, mang nhan bien mat", "Ky giua: NST co xoan cuc dai, xep 1 hang o mat phang xich dao", "Ky sau: Cac cromatit tach nhau ve 2 cuc", "Ky cuoi: Mang nhan xuat hien, te bao chat phan chia"])
    ]),
    ("document/slide/bai-1-gen-ma-di-truyen.pdf", "Bai 1: Gen, Ma Di Truyen Va Nhan Doi ADN", [
        ("Khai niem Gen", ["Gen la mot doan ADN mang thong tin ma hoa mot san pham xac dinh", "San pham co the la chuoi polypeptide hoac ARN"]),
        ("Ma di truyen", ["Ma di truyen la ma bo ba (Codon)", "Co 64 bo ba: 61 bo ba ma hoa axit amin, 3 bo ba ket thuc", "Ma di truyen co tinh pho bien, tinh thoai hoa va tinh dac hieu"]),
        ("Nhan doi ADN", ["Dien ra theo nguyen tac bo sung va nguyen tac ban bao ton", "Enzyme ADN polymerase tong hop chuoi moi theo chieu 5' -> 3'"])
    ]),
    ("document/slide/Le-cuoi.pdf", "Slide Bai Giang: Le Cuoi Va Van Hoa Sinh Hoc", [
        ("Tong quan bai giang", ["Gioi thieu quy trinh va y nghia van hoa", "Tich hop kien thuc truyen thong va sinh hoc"]),
        ("Noi dung chi tiet", ["Y nghia gia dinh va su duy tri the he", "Cac nghi le truyen thong Viet Nam"])
    ])
]

os.makedirs("document/slide", exist_ok=True)
os.makedirs("public/document/slide", exist_ok=True)

for path, title, slides in decks:
    create_simple_pdf(path, title, slides)
    pub_path = os.path.join("public", path)
    create_simple_pdf(pub_path, title, slides)

print("All PDF slide decks generated successfully!")
