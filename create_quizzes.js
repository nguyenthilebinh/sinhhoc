import fs from 'fs';
import path from 'path';
import XLSX from 'xlsx';

// Ensure directories exist
const docDir = 'document/quiz';
const pubDir = 'public/document/quiz';

fs.mkdirSync(docDir, { recursive: true });
fs.mkdirSync(pubDir, { recursive: true });

// 1. Manifest
const manifest = [
  {
    id: 'quiz-sinh-10',
    bookCode: 'SINH 10',
    title: 'Bộ Trắc Nghiệm Sinh Học 10: Tế Bào',
    chapter: 'Chương 1 & 2',
    fileName: 'quizzes_template.xlsx'
  },
  {
    id: 'quiz-sinh-11',
    bookCode: 'SINH 11',
    title: 'Bộ Trắc Nghiệm Sinh Học 11: Quang Hợp & Sinh Lý',
    chapter: 'Chương 1: Chuyển Hóa Năng Lượng',
    fileName: 'de-on-tap-sinh-11.xlsx'
  },
  {
    id: 'quiz-sinh-12',
    bookCode: 'SINH 12',
    title: 'Bộ Trắc Nghiệm Sinh Học 12: Gen & Di Truyền',
    chapter: 'Chương 1: Cơ Chế Di Truyền',
    fileName: 'de-on-tap-sinh-12.xlsx'
  }
];

fs.writeFileSync(path.join(docDir, 'quizzes_manifest.json'), JSON.stringify(manifest, null, 2));
fs.writeFileSync(path.join(pubDir, 'quizzes_manifest.json'), JSON.stringify(manifest, null, 2));

// Function to write XLSX file
function writeQuizXlsx(filePath, rows) {
  const worksheet = XLSX.utils.json_to_sheet(rows);
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, 'Quizzes');
  XLSX.writeFile(workbook, filePath);
}

// Data for Sinh 11
const sinh11Data = [
  {
    ID: 'qb-11-01',
    BookCode: 'SINH 11',
    Chapter: 'Chương 1: Chuyển Hóa Vật Chất',
    Question: 'Quang hợp ở thực vật diễn ra tại bào quan nào sau đây?',
    OptionA: 'Ti thể',
    OptionB: 'Lục thể',
    OptionC: 'Bộ máy Golgi',
    OptionD: 'Ribosome',
    CorrectIndex: 1,
    Explanation: 'Lục thể chứa diệp lục hấp thụ năng lượng ánh sáng mặt trời để thực hiện quá trình quang hợp.'
  },
  {
    ID: 'qb-11-02',
    BookCode: 'SINH 11',
    Chapter: 'Chương 1: Chuyển Hóa Vật Chất',
    Question: 'Sản phẩm của Pha Sáng quang hợp cung cấp cho Pha Tối là gì?',
    OptionA: 'ATP và NADPH',
    OptionB: 'CO2 và H2O',
    OptionC: 'Glucose và O2',
    OptionD: 'Pyruvate và Acetyl-CoA',
    CorrectIndex: 0,
    Explanation: 'Pha sáng biến đổi năng lượng ánh sáng thành năng lượng hóa học trong ATP và NADPH để dùng cho chu trình Calvin ở pha tối.'
  },
  {
    ID: 'qb-11-03',
    BookCode: 'SINH 11',
    Chapter: 'Chương 1: Chuyển Hóa Vật Chất',
    Question: 'Khí O2 được giải phóng trong quang hợp có nguồn gốc từ phân tử nào?',
    OptionA: 'Khí CO2',
    OptionB: 'Phân tử H2O',
    OptionC: 'Phân tử Glucose',
    OptionD: 'Axit Pyruvic',
    CorrectIndex: 1,
    Explanation: 'O2 được tạo ra từ quá trình quang phân giải nước diễn ra ở màng Thylakoid trong pha sáng.'
  }
];

// Data for Sinh 12
const sinh12Data = [
  {
    ID: 'qb-12-01',
    BookCode: 'SINH 12',
    Chapter: 'Chương 1: Cơ Chế Di Truyền',
    Question: 'Đơn phân cấu tạo nên phân tử ADN là gì?',
    OptionA: 'Axit amin',
    OptionB: 'Nucleotide',
    OptionC: 'Glucose',
    OptionD: 'Axit béo',
    CorrectIndex: 1,
    Explanation: 'ADN là đại phân tử sinh học cấu tạo theo nguyên tắc đa phân, đơn phân là các Nucleotide (A, T, G, C).'
  },
  {
    ID: 'qb-12-02',
    BookCode: 'SINH 12',
    Chapter: 'Chương 1: Cơ Chế Di Truyền',
    Question: 'Mã di truyền có tính thoái hóa nghĩa là gì?',
    OptionA: 'Mỗi bộ ba chỉ mã hóa cho 1 loại axit amin',
    OptionB: 'Nhiều bộ ba khác nhau cùng mã hóa cho 1 loại axit amin',
    OptionC: 'Tất cả các loài đều dùng chung 1 bộ mã di truyền',
    OptionD: 'Mã di truyền bị thay đổi qua các thế hệ',
    CorrectIndex: 1,
    Explanation: 'Tính thoái hóa (dư thừa) của mã di truyền có nghĩa là nhiều bộ ba khác nhau cùng mã hóa cho một loại axit amin.'
  },
  {
    ID: 'qb-12-03',
    BookCode: 'SINH 12',
    Chapter: 'Chương 1: Cơ Chế Di Truyền',
    Question: 'Quá trình tái bản ADN diễn ra theo những nguyên tắc nào?',
    OptionA: 'Nguyên tắc bổ sung và nguyên tắc bán bảo tồn',
    OptionB: 'Nguyên tắc bổ sung và nguyên tắc gián đoạn',
    OptionC: 'Nguyên tắc bảo tồn và nguyên tắc ngẫu nhiên',
    OptionD: 'Nguyên tắc tự do và nguyên tắc bổ sung',
    CorrectIndex: 0,
    Explanation: 'Tái bản ADN diễn ra theo nguyên tắc bổ sung (A-T, G-X) và nguyên tắc bán bảo tồn (mỗi ADN con có 1 mạch cũ và 1 mạch mới).'
  }
];

writeQuizXlsx(path.join(docDir, 'de-on-tap-sinh-11.xlsx'), sinh11Data);
writeQuizXlsx(path.join(pubDir, 'de-on-tap-sinh-11.xlsx'), sinh11Data);

writeQuizXlsx(path.join(docDir, 'de-on-tap-sinh-12.xlsx'), sinh12Data);
writeQuizXlsx(path.join(pubDir, 'de-on-tap-sinh-12.xlsx'), sinh12Data);

console.log('Successfully generated quiz decks and quizzes_manifest.json!');
