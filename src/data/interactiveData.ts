import { DiagramData, QuizData, TimelineData, MatchingData } from '../types';

export const DIAGRAMS: Record<string, DiagramData> = {
  'cell-structure-01': {
    id: 'cell-structure-01',
    title: 'Cấu Trúc Tế Bào Nhân Thực (Eukaryotic Cell)',
    description: 'Bấm vào từng bào quan để khám phá cấu trúc chi tiết và chức năng sinh học của chúng.',
    type: 'cell',
    hotspots: [
      {
        id: 'nucleus',
        name: 'Nhân Tế Bào (Nucleus)',
        x: 50,
        y: 48,
        description: 'Bào quan lớn nhất chứa vật chất di truyền (DNA) của tế bào nhân thực.',
        function: 'Lưu trữ và bảo quản thông tin di truyền, điều khiển mọi hoạt động sống của tế bào.',
        importance: 'Được coi là "trung tâm chỉ huy" của tế bào.',
        color: '#a855f7'
      },
      {
        id: 'mitochondria',
        name: 'Ti Thể (Mitochondria)',
        x: 75,
        y: 65,
        description: 'Bào quan có 2 lớp màng, màng trong gấp nếp tạo thành các mào chứa enzyme hô hấp.',
        function: 'Tổng hợp ATP (nguồn năng lượng chính cho tế bào) thông qua quá trình hô hấp tế bào.',
        importance: 'Được gọi là "nhà máy năng lượng" của tế bào.',
        color: '#f43f5e'
      },
      {
        id: 'ribosome',
        name: 'Ribosome',
        x: 30,
        y: 35,
        description: 'Bào quan nhỏ không có màng bao bọc, cấu tạo từ rRNA và protein.',
        function: 'Nơi diễn ra quá trình dịch mã, giải mã thông tin di truyền để tổng hợp chuỗi polypeptide (protein).',
        importance: 'Quyết định việc hình thành đặc điểm hình thái và sinh lý của cơ thể.',
        color: '#fbbf24'
      },
      {
        id: 'chloroplast',
        name: 'Lục Thể (Chloroplast)',
        x: 25,
        y: 70,
        description: 'Chỉ có ở tế bào thực vật, chứa chất diệp lục (chlorophyll) hấp thụ ánh sáng.',
        function: 'Thực hiện quá trình quang hợp: chuyển năng lượng ánh sáng mặt trời thành năng lượng hóa học trong hợp chất hữu cơ (glucose).',
        importance: 'Nguồn cung cấp oxy và chất dinh dưỡng cho toàn bộ sinh giới.',
        color: '#10b981'
      },
      {
        id: 'membrane',
        name: 'Màng Sinh Chất (Cell Membrane)',
        x: 90,
        y: 35,
        description: 'Cấu trúc khảm động gồm lớp kép phospholipid và các protein màng.',
        function: 'Trao đổi chất có chọn lọc (bán thấm), tiếp nhận thông tin tế bào và bảo vệ khối tế bào chất.',
        importance: 'Duy trì môi trường nội bào ổn định (cân bằng nội môi).',
        color: '#06b6d4'
      },
      {
        id: 'golgi',
        name: 'Bộ Máy Golgi',
        x: 65,
        y: 28,
        description: 'Hệ thống các túi dẹt xếp chồng lên nhau nhưng tách biệt.',
        function: 'Thu nhận, biến đổi, đóng gói và phân phối các sản phẩm protein và lipid đến các nơi trong hoặc ngoài tế bào.',
        importance: 'Được ví như "phòng bưu điện hoặc phân phối" của tế bào.',
        color: '#ec4899'
      }
    ]
  },

  'dna-helix-01': {
    id: 'dna-helix-01',
    title: 'Cấu Trúc Không Gian ADN (DNA Double Helix)',
    description: 'Khám phá mô hình xoắn đôi ADN do Watson và Crick phát minh.',
    type: 'dna',
    hotspots: [
      {
        id: 'base-pair',
        name: 'Cặp Nu bổ sung (A-T & G-C)',
        x: 50,
        y: 30,
        description: 'Các nucleotide liên kết giữa 2 mạch theo nguyên tắc bổ sung: Adenine bắt cặp với Thymine (2 liên kết hydro), Guanine bắt cặp với Cytosine (3 liên kết hydro).',
        function: 'Đảm bảo cấu trúc ADN bền vững nhưng dễ mở xoắn khi tái bản và phiên mã.',
        importance: 'Tính nguyên tắc bổ sung giúp truyền đạt chính xác thông tin di truyền qua các thế hệ.',
        color: '#06b6d4'
      },
      {
        id: 'backbone',
        name: 'Khung Đường - Phosphate',
        x: 20,
        y: 50,
        description: 'Hình thành bởi liên kết phosphodiester giữa đường Deoxyribose và gốc Phosphate.',
        function: 'Tạo nên trục cột liên tục bảo vệ các base nitơ bên trong.',
        importance: 'Đảm bảo tính bền vững hóa học của phân tử ADN.',
        color: '#3b82f6'
      },
      {
        id: 'major-groove',
        name: 'Rãnh Lớn (Major Groove)',
        x: 75,
        y: 50,
        description: 'Khoảng hở rộng trên bề mặt xoắn ADN.',
        function: 'Nơi các protein điều hòa và enzyme (như RNA Polymerase) tiếp xúc gắn vào dòng mã ADN.',
        importance: 'Đóng vai trò quan trọng trong điều hòa hoạt động của gen.',
        color: '#8b5cf6'
      }
    ]
  }
};

export const QUIZZES: Record<string, QuizData> = {
  'quiz-cell-01': {
    id: 'quiz-cell-01',
    title: 'Kiểm Tra Nhanh: Cấu Trúc Tế Bào Nhân Thực',
    questions: [
      {
        id: 'q1',
        question: 'Bào quan nào được ví như "nhà máy năng lượng" của tế bào?',
        options: ['Bộ máy Golgi', 'Ti thể', 'Ribosome', 'Lưới nội chất'],
        correctIndex: 1,
        explanation: 'Ti thể là nơi diễn ra quá trình hô hấp tế bào, phân giải đường để tạo ra ATP cung cấp năng lượng cho các hoạt động sống.'
      },
      {
        id: 'q2',
        question: 'Cấu trúc nào quản lý thông tin di truyền và điều khiển mọi hoạt động của tế bào nhân thực?',
        options: ['Không bào', 'Màng sinh chất', 'Nhân tế bào', 'Lục thể'],
        correctIndex: 2,
        explanation: 'Nhân chứa ADN (vật chất di truyền), lưu trữ thông tin điều khiển mọi đặc điểm và quá trình tổng hợp protein của tế bào.'
      },
      {
        id: 'q3',
        question: 'Theo mô hình khảm động, màng sinh chất được cấu tạo chủ yếu từ hai thành phần nào?',
        options: ['Protein và Xenlulozơ', 'Phospholipid và Protein', 'ADN và RNA', 'Glycogen và Enzyme'],
        correctIndex: 1,
        explanation: 'Màng sinh chất gồm lớp kép Phospholipid (tạo khung linh động) và các Protein màng (thực hiện chức năng vận chuyển, thụ thể).'
      }
    ]
  },

  'quiz-dna-01': {
    id: 'quiz-dna-01',
    title: 'Kiểm Tra Nhanh: Cơ Chế Di Truyền & ADN',
    questions: [
      {
        id: 'q1',
        question: 'Trên mạch kép ADN, Adenine (A) liên kết bổ sung với Thymine (T) bằng mấy liên kết hydro?',
        options: ['1 liên kết', '2 liên kết', '3 liên kết', '4 liên kết'],
        correctIndex: 1,
        explanation: 'Cặp A-T liên kết với nhau bằng 2 liên kết hydro, trong khi cặp G-C liên kết bằng 3 liên kết hydro.'
      },
      {
        id: 'q2',
        question: 'Quá trình tổng hợp ARN từ khuôn ADN được gọi là gì?',
        options: ['Dịch mã', 'Tái bản ADN', 'Phiên mã', 'Đột biến gen'],
        correctIndex: 2,
        explanation: 'Phiên mã (Transcription) là quá trình enzyme RNA polymerase tổng hợp phân tử ARN dựa trên mạch khuôn của gen.'
      }
    ]
  },

  'quiz-mitosis-01': {
    id: 'quiz-mitosis-01',
    title: 'Kiểm Tra Nhanh: Nguyên Phân & Phân Bào',
    questions: [
      {
        id: 'q1',
        question: 'Ở kỳ nào của quá trình nguyên phân, các nhiễm sắc thể co xoắn cực đại và xếp thành 1 hàng trên mặt phẳng xích đạo?',
        options: ['Kỳ đầu', 'Kỳ giữa', 'Kỳ sau', 'Kỳ cuối'],
        correctIndex: 1,
        explanation: 'Ở kỳ giữa, các NST kép co xoắn tối đa (giúp dễ quan sát hình thái) và xếp thành 1 hàng ở mặt phẳng xích đạo.'
      },
      {
        id: 'q2',
        question: 'Kết quả của 1 lần nguyên phân từ 1 tế bào mẹ (2n) sẽ tạo ra bao nhiêu tế bào con?',
        options: ['2 tế bào con (2n)', '4 tế bào con (n)', '2 tế bào con (n)', '1 tế bào con (4n)'],
        correctIndex: 0,
        explanation: 'Nguyên phân giúp tạo ra 2 tế bào con có bộ nhiễm sắc thể giống hệt tế bào mẹ (2n).'
      }
    ]
  }
};

export const TIMELINES: Record<string, TimelineData> = {
  'timeline-mitosis-01': {
    id: 'timeline-mitosis-01',
    title: 'Diễn Biến Các Kỳ Nguyên Phân (Mitosis Timeline)',
    description: 'Bấm vào từng kỳ để theo dõi sự biến đổi hình thái nhiễm sắc thể và màng nhân.',
    steps: [
      {
        id: 'prophase',
        stage: 'Kỳ Đầu (Prophase)',
        title: 'Co xoắn NST & Biến mất màng nhân',
        description: 'Các nhiễm sắc thể kép bắt đầu co xoắn và thấy rõ dưới kính hiển vi. Màng nhân và nhân con tiêu biến. Thoi phân bào xuất hiện.',
        keyEvents: [
          'NST kép bắt đầu co xoắn ngắn lại.',
          'Màng nhân và nhân con tiêu biến.',
          'Thoi phân bào hình thành đính vào tâm động NST.'
        ],
        visualSvgType: 'prophase'
      },
      {
        id: 'metaphase',
        stage: 'Kỳ Giữa (Metaphase)',
        title: 'Co xoắn cực đại & Xếp hàng xích đạo',
        description: 'NST kép co xoắn cực đại có hình thái đặc trưng nhất. Các NST kép tập trung xếp thành 1 hàng trên mặt phẳng xích đạo của thoi phân bào.',
        keyEvents: [
          'NST kép co xoắn ngắn và dày nhất.',
          'Xếp thành 1 hàng duy nhất ở mặt phẳng xích đạo.',
          'Thoi phân bào bám vào 2 phía tâm động của NST kép.'
        ],
        visualSvgType: 'metaphase'
      },
      {
        id: 'anaphase',
        stage: 'Kỳ Sau (Anaphase)',
        title: 'Tách Chromatid & Tách về 2 cực',
        description: 'Tâm động của mỗi NST kép chẻ đôi. 2 chromatid chị em tách nhau ra thành 2 NST đơn và được thoi phân bào kéo về 2 cực tế bào.',
        keyEvents: [
          'Tâm động chẻ đôi, 2 chromatid tách thành 2 NST đơn.',
          'Các NST đơn di chuyển đồng thời về 2 cực của tế bào.'
        ],
        visualSvgType: 'anaphase'
      },
      {
        id: 'telophase',
        stage: 'Kỳ Cuối (Telophase)',
        title: 'Dãn xoắn & Tái lập màng nhân',
        description: 'Các NST đơn đi về 2 cực bắt đầu dãn xoắn dài ra. Màng nhân và nhân con xuất hiện trở lại. Phân chia tế bào chất hoàn thành.',
        keyEvents: [
          'NST dãn xoắn trở lại dạng sợi mảnh.',
          'Màng nhân và nhân con tái lập ở mỗi cực.',
          'Tế bào chất phân chia hình thành 2 tế bào con.'
        ],
        visualSvgType: 'telophase'
      }
    ]
  }
};

export const MATCHINGS: Record<string, MatchingData> = {
  'matching-organelles-01': {
    id: 'matching-organelles-01',
    title: 'Nối Bào Quan Với Chức Năng Tương Ứng',
    instruction: 'Hãy chọn 1 khái niệm bên trái, sau đó chọn chức năng sinh học đúng ở bên phải để ghép nối.',
    pairs: [
      { id: 'p1', term: 'Lục Thể', definition: 'Thực hiện quang hợp tổng hợp đường Glucose' },
      { id: 'p2', term: 'Ti Thể', definition: 'Trạm năng lượng tổng hợp ATP qua hô hấp' },
      { id: 'p3', term: 'Ribosome', definition: 'Nơi dịch mã tổng hợp chuỗi Polypeptide' },
      { id: 'p4', term: 'Bộ máy Golgi', definition: 'Đóng gói, chế biến và phân phối sản phẩm tế bào' },
      { id: 'p5', term: 'Lysosome', definition: 'Chứa enzyme tiêu hóa nội bào và phân giải bào quan già' }
    ]
  }
};
