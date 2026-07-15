import type { Language } from './types';

export interface StudentsTranslations {
  pageTitle: string;
  pageHeaderTitle: string;
  sectionTitle: string;
  sectionDescription: string;
  searchPlaceholder: string;
  table: {
    name: string;
    age: string;
    grade: string;
    department: string;
    teacher: string;
    partsMemorized: string;
    currentProgress: string;
    status: string;
    email: string;
    phone: string;
    circle: string;
    joinDate: string;
    student: string;
    attendance: string;
    actions: string;
    parts: string;
  };
  actions: {
    addStudent: string;
    editStudent: string;
    deleteStudent: string;
    viewDetails: string;
    addNote: string;
    addNewStudent: string;
    view: string;
    edit: string;
    delete: string;
    saveChanges: string;
    cancel: string;
    addNewNote: string;
    editProfile: string;
    viewSchedule: string;
    pin: string;
    unpin: string;
  };
  form: {
    namePlaceholder: string;
    emailPlaceholder: string;
    phonePlaceholder: string;
    selectGrade: string;
    selectDepartment: string;
    selectTeacher: string;
    name: string;
    age: string;
    grade: string;
    department: string;
    teacher: string;
    parentName: string;
    parentPhone: string;
    partsMemorized: string;
    currentProgress: string;
    previousProgress: string;
    attendanceRate: string;
  };
  tabs: {
    all: string;
    active: string;
    inactive: string;
    notes: string;
    allStudents: string;
    attendance: string;
    grades: string;
    images: string;
  };
  notes: {
    title: string;
    type: string;
    content: string;
    date: string;
    teacher: string;
    positive: string;
    negative: string;
    empty: string;
    supervisorNotes: string;
    supervisorNotesDesc: string;
    noNotesForStudent: string;
  };
  status: {
    active: string;
    inactive: string;
  };
  deleteConfirm: string;
  deleteConfirmMessage: string;
  confirmDelete: string;
  empty: string;
  departments: {
    all: string;
    quran: string;
    tajweed: string;
    tarbawi: string;
  };
  dialog: {
    addTitle: string;
    addDescription: string;
    editTitle: string;
    editDescription: string;
  };
  toast: {
    error: string;
    fillRequired: string;
    addSuccess: string;
    addSuccessDesc: string;
    addError: string;
    editSuccess: string;
    editSuccessDesc: string;
    editError: string;
    deleteSuccess: string;
    deleteSuccessDesc: string;
    deleteError: string;
    viewDetails: string;
    viewDetailsDesc: string;
    noteContentRequired: string;
    noteAddSuccess: string;
    noteAddSuccessDesc: string;
    noteAddError: string;
    noteEditSuccess: string;
    noteEditSuccessDesc: string;
    noteEditError: string;
    noteDeleteSuccess: string;
    noteDeleteSuccessDesc: string;
    noteDeleteError: string;
    imageEditSuccess: string;
    imageEditSuccessDesc: string;
    imageEditError: string;
  };
  images: {
    title: string;
    description: string;
    newSurah: string;
    newSurahPlaceholder: string;
    recentPast: string;
    recentPastPlaceholder: string;
    distantPast: string;
    distantPastPlaceholder: string;
    noNewImage: string;
    noData: string;
    noImagesForStudent: string;
    editTitle: string;
    editDescription: string;
    totalPartsMemorized: string;
    currentProgressLabel: string;
  };
  attendanceTab: {
    title: string;
    description: string;
  };
  gradesTab: {
    title: string;
    description: string;
  };
  card: {
    studentListTitle: string;
    studentListDesc: string;
  };
}

export const students: Record<Language, StudentsTranslations> = {
  ar: {
    pageTitle: 'الطلاب',
    pageHeaderTitle: 'إدارة الطلاب',
    sectionTitle: 'الطلاب',
    sectionDescription: 'إدارة بيانات الطلاب ومتابعة أدائهم وحضورهم',
    searchPlaceholder: 'البحث عن طالب...',
    table: {
      name: 'الاسم',
      age: 'العمر',
      grade: 'الصف',
      department: 'القسم',
      teacher: 'المعلم',
      partsMemorized: 'الأجزاء المحفوظة',
      currentProgress: 'التقدم الحالي',
      status: 'الحالة',
      email: 'البريد الإلكتروني',
      phone: 'الهاتف',
      circle: 'الحلقة',
      joinDate: 'تاريخ الالتحاق',
      student: 'الطالب',
      attendance: 'الحضور',
      actions: 'إجراءات',
      parts: 'الأجزاء',
    },
    actions: {
      addStudent: 'إضافة طالب',
      editStudent: 'تعديل طالب',
      deleteStudent: 'حذف طالب',
      viewDetails: 'عرض التفاصيل',
      addNote: 'إضافة ملاحظة',
      addNewStudent: 'إضافة طالب جديد',
      view: 'عرض',
      edit: 'تعديل',
      delete: 'حذف',
      saveChanges: 'حفظ التعديلات',
      cancel: 'إلغاء',
      addNewNote: 'إضافة ملاحظة جديدة',
      editProfile: 'تعديل الملف الشخصي',
      viewSchedule: 'عرض الجدول',
      pin: 'تثبيت',
      unpin: 'إلغاء التثبيت',
    },
    form: {
      namePlaceholder: 'أدخل اسم الطالب',
      emailPlaceholder: 'أدخل البريد الإلكتروني',
      phonePlaceholder: 'أدخل رقم الهاتف',
      selectGrade: 'اختر الصف',
      selectDepartment: 'اختر القسم',
      selectTeacher: 'اختر المعلم',
      name: 'الاسم',
      age: 'العمر',
      grade: 'المرحلة الدراسية',
      department: 'القسم',
      teacher: 'المعلم',
      parentName: 'اسم ولي الأمر',
      parentPhone: 'هاتف ولي الأمر',
      partsMemorized: 'الأجزاء المحفوظة',
      currentProgress: 'التقدم الحالي',
      previousProgress: 'التقدم السابق',
      attendanceRate: 'نسبة الحضور',
    },
    tabs: {
      all: 'الكل',
      active: 'نشط',
      inactive: 'غير نشط',
      notes: 'الملاحظات',
      allStudents: 'جميع الطلاب',
      attendance: 'الحضور',
      grades: 'الدرجات',
      images: 'الصور',
    },
    notes: {
      title: 'الملاحظات',
      type: 'النوع',
      content: 'المحتوى',
      date: 'التاريخ',
      teacher: 'المعلم',
      positive: 'إيجابي',
      negative: 'سلبي',
      empty: 'لا توجد ملاحظات',
      supervisorNotes: 'ملاحظات المشرفين',
      supervisorNotesDesc: 'ملاحظات سلوكية وأدائية للطلاب',
      noNotesForStudent: 'لا توجد ملاحظات لهذا الطالب',
    },
    status: {
      active: 'نشط',
      inactive: 'غير نشط',
    },
    deleteConfirm: 'هل أنت متأكد من حذف هذا الطالب؟',
    deleteConfirmMessage: 'هل أنت متأكد من حذف الطالب "{{name}}"؟ لا يمكن التراجع عن هذا الإجراء.',
    confirmDelete: 'تأكيد الحذف',
    empty: 'لا يوجد طلاب مسجلون',
    departments: {
      all: 'جميع الأقسام',
      quran: 'قرآن',
      tajweed: 'تجويد',
      tarbawi: 'تربوي',
    },
    dialog: {
      addTitle: 'إضافة طالب جديد',
      addDescription: 'أدخل بيانات الطالب الجديد',
      editTitle: 'تعديل بيانات الطالب',
      editDescription: 'قم بتعديل بيانات الطالب',
    },
    toast: {
      error: 'خطأ',
      fillRequired: 'يرجى ملء جميع الحقول المطلوبة',
      addSuccess: 'تم الإضافة',
      addSuccessDesc: 'تم إضافة الطالب بنجاح',
      addError: 'حدث خطأ أثناء إضافة الطالب',
      editSuccess: 'تم التعديل',
      editSuccessDesc: 'تم تعديل بيانات الطالب بنجاح',
      editError: 'حدث خطأ أثناء تعديل الطالب',
      deleteSuccess: 'تم الحذف',
      deleteSuccessDesc: 'تم حذف الطالب بنجاح',
      deleteError: 'حدث خطأ أثناء حذف الطالب',
      viewDetails: 'عرض تفاصيل الطالب',
      viewDetailsDesc: 'جاري عرض تفاصيل الطالب {{name}}...',
      noteContentRequired: 'يرجى إدخال محتوى الملاحظة',
      noteAddSuccess: 'تم الإضافة',
      noteAddSuccessDesc: 'تم إضافة الملاحظة بنجاح',
      noteAddError: 'حدث خطأ أثناء إضافة الملاحظة',
      noteEditSuccess: 'تم التعديل',
      noteEditSuccessDesc: 'تم تعديل الملاحظة بنجاح',
      noteEditError: 'حدث خطأ أثناء تعديل الملاحظة',
      noteDeleteSuccess: 'تم الحذف',
      noteDeleteSuccessDesc: 'تم حذف الملاحظة بنجاح',
      noteDeleteError: 'حدث خطأ أثناء حذف الملاحظة',
      imageEditSuccess: 'تم التعديل',
      imageEditSuccessDesc: 'تم تعديل السور المحفوظة بنجاح',
      imageEditError: 'حدث خطأ أثناء تعديل السور المحفوظة',
    },
    images: {
      title: 'الصور المحفوظة للطلاب',
      description: 'عرض ومتابعة صور القرآن المحفوظة لكل طالب',
      newSurah: 'السورة الجديدة',
      newSurahPlaceholder: 'سورة الجديدة',
      recentPast: 'الماضي القريب',
      recentPastPlaceholder: 'الماضي القريب',
      distantPast: 'الماضي البعيد',
      distantPastPlaceholder: 'الماضي البعيد',
      noNewImage: 'لم يتم تسجيل صورة جديدة',
      noData: 'لا يوجد',
      noImagesForStudent: 'لا توجد صور مسجلة لهذا الطالب',
      editTitle: 'تعديل السور المحفوظة',
      editDescription: 'تعديل سور {{name}}',
      totalPartsMemorized: 'إجمالي الأجزاء المحفوظة',
      currentProgressLabel: 'التقدم الحالي',
    },
    attendanceTab: {
      title: 'الحضور والغياب',
      description: 'متابعة حضور الطلاب ونسبة الغياب',
    },
    gradesTab: {
      title: 'درجات الاختبارات',
      description: 'عرض درجات الطلاب في جميع المواد',
    },
    card: {
      studentListTitle: 'قائمة الطلاب',
      studentListDesc: 'جميع الطلاب المسجلين في المركز',
    },
  },
  en: {
    pageTitle: 'Students',
    pageHeaderTitle: 'Student Management',
    sectionTitle: 'Students',
    sectionDescription: 'Manage student data and track their performance and attendance',
    searchPlaceholder: 'Search for a student...',
    table: {
      name: 'Name',
      age: 'Age',
      grade: 'Grade',
      department: 'Department',
      teacher: 'Teacher',
      partsMemorized: 'Parts Memorized',
      currentProgress: 'Current Progress',
      status: 'Status',
      email: 'Email',
      phone: 'Phone',
      circle: 'Circle',
      joinDate: 'Join Date',
      student: 'Student',
      attendance: 'Attendance',
      actions: 'Actions',
      parts: 'Parts',
    },
    actions: {
      addStudent: 'Add Student',
      editStudent: 'Edit Student',
      deleteStudent: 'Delete Student',
      viewDetails: 'View Details',
      addNote: 'Add Note',
      addNewStudent: 'Add New Student',
      view: 'View',
      edit: 'Edit',
      delete: 'Delete',
      saveChanges: 'Save Changes',
      cancel: 'Cancel',
      addNewNote: 'Add New Note',
      editProfile: 'Edit Profile',
      viewSchedule: 'View Schedule',
      pin: 'Pin',
      unpin: 'Unpin',
    },
    form: {
      namePlaceholder: 'Enter student name',
      emailPlaceholder: 'Enter email address',
      phonePlaceholder: 'Enter phone number',
      selectGrade: 'Select grade',
      selectDepartment: 'Select department',
      selectTeacher: 'Select teacher',
      name: 'Name',
      age: 'Age',
      grade: 'Grade Level',
      department: 'Department',
      teacher: 'Teacher',
      parentName: 'Parent Name',
      parentPhone: 'Parent Phone',
      partsMemorized: 'Parts Memorized',
      currentProgress: 'Current Progress',
      previousProgress: 'Previous Progress',
      attendanceRate: 'Attendance Rate',
    },
    tabs: {
      all: 'All',
      active: 'Active',
      inactive: 'Inactive',
      notes: 'Notes',
      allStudents: 'All Students',
      attendance: 'Attendance',
      grades: 'Grades',
      images: 'Images',
    },
    notes: {
      title: 'Notes',
      type: 'Type',
      content: 'Content',
      date: 'Date',
      teacher: 'Teacher',
      positive: 'Positive',
      negative: 'Negative',
      empty: 'No notes found',
      supervisorNotes: 'Supervisor Notes',
      supervisorNotesDesc: 'Behavioral and performance notes for students',
      noNotesForStudent: 'No notes for this student',
    },
    status: {
      active: 'Active',
      inactive: 'Inactive',
    },
    deleteConfirm: 'Are you sure you want to delete this student?',
    deleteConfirmMessage: 'Are you sure you want to delete student "{{name}}"? This action cannot be undone.',
    confirmDelete: 'Confirm Delete',
    empty: 'No students registered',
    departments: {
      all: 'All Departments',
      quran: 'Quran',
      tajweed: 'Tajweed',
      tarbawi: 'Tarbawi',
    },
    dialog: {
      addTitle: 'Add New Student',
      addDescription: 'Enter the new student details',
      editTitle: 'Edit Student Data',
      editDescription: 'Edit student data',
    },
    toast: {
      error: 'Error',
      fillRequired: 'Please fill all required fields',
      addSuccess: 'Added',
      addSuccessDesc: 'Student added successfully',
      addError: 'An error occurred while adding the student',
      editSuccess: 'Updated',
      editSuccessDesc: 'Student data updated successfully',
      editError: 'An error occurred while updating the student',
      deleteSuccess: 'Deleted',
      deleteSuccessDesc: 'Student deleted successfully',
      deleteError: 'An error occurred while deleting the student',
      viewDetails: 'View Student Details',
      viewDetailsDesc: 'Viewing details for student {{name}}...',
      noteContentRequired: 'Please enter note content',
      noteAddSuccess: 'Added',
      noteAddSuccessDesc: 'Note added successfully',
      noteAddError: 'An error occurred while adding the note',
      noteEditSuccess: 'Updated',
      noteEditSuccessDesc: 'Note updated successfully',
      noteEditError: 'An error occurred while updating the note',
      noteDeleteSuccess: 'Deleted',
      noteDeleteSuccessDesc: 'Note deleted successfully',
      noteDeleteError: 'An error occurred while deleting the note',
      imageEditSuccess: 'Updated',
      imageEditSuccessDesc: 'Memorized surahs updated successfully',
      imageEditError: 'An error occurred while updating memorized surahs',
    },
    images: {
      title: 'Student Memorized Images',
      description: 'View and track memorized Quran images for each student',
      newSurah: 'New Surah',
      newSurahPlaceholder: 'New surah',
      recentPast: 'Recent Past',
      recentPastPlaceholder: 'Recent past',
      distantPast: 'Distant Past',
      distantPastPlaceholder: 'Distant past',
      noNewImage: 'No new image recorded',
      noData: 'N/A',
      noImagesForStudent: 'No images recorded for this student',
      editTitle: 'Edit Memorized Surahs',
      editDescription: 'Edit surahs for {{name}}',
      totalPartsMemorized: 'Total Parts Memorized',
      currentProgressLabel: 'Current Progress',
    },
    attendanceTab: {
      title: 'Attendance',
      description: 'Track student attendance and absence rates',
    },
    gradesTab: {
      title: 'Exam Grades',
      description: 'View student grades in all subjects',
    },
    card: {
      studentListTitle: 'Student List',
      studentListDesc: 'All students registered in the center',
    },
  },
};
