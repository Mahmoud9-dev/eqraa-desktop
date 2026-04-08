import type { Language } from './types';

export interface QuranCirclesTranslations {
  pageTitle: string;
  heading: string;
  description: string;
  searchPlaceholder: string;

  tabs: {
    circles: string;
    members: string;
    records: string;
  };

  status: {
    active: string;
    inactive: string;
  };

  circleList: {
    title: string;
    description: string;
  };

  circleCard: {
    supervisor: string;
    dailyMemorization: string;
    dailyRevision: string;
    memberCount: string;
  };

  actions: {
    view: string;
    edit: string;
    delete: string;
    cancel: string;
  };

  tableHeaders: {
    circleName: string;
    supervisor: string;
    dailyMemorization: string;
    dailyRevision: string;
    memberCount: string;
    status: string;
    actions: string;
    student: string;
    circle: string;
    surah: string;
    verses: string;
    type: string;
    evaluation: string;
    date: string;
  };

  addCircleDialog: {
    trigger: string;
    title: string;
    description: string;
    nameLabel: string;
    supervisorLabel: string;
    supervisorPlaceholder: string;
    descriptionLabel: string;
    dailyMemorizationLabel: string;
    dailyRevisionLabel: string;
    weeklyEvaluationLabel: string;
    submit: string;
  };

  editCircleDialog: {
    title: string;
    description: string;
    nameLabel: string;
    supervisorLabel: string;
    supervisorPlaceholder: string;
    descriptionLabel: string;
    dailyMemorizationLabel: string;
    dailyRevisionLabel: string;
    weeklyEvaluationLabel: string;
    submit: string;
  };

  deleteCircleDialog: {
    title: string;
    description: string;
    confirm: string;
  };

  addMemberDialog: {
    trigger: string;
    title: string;
    description: string;
    circleLabel: string;
    circlePlaceholder: string;
    studentLabel: string;
    studentPlaceholder: string;
    submit: string;
  };

  members: {
    sectionTitle: string;
    joinedPrefix: string;
  };

  addRecordDialog: {
    trigger: string;
    title: string;
    description: string;
    circleLabel: string;
    circlePlaceholder: string;
    studentLabel: string;
    studentPlaceholder: string;
    surahLabel: string;
    fromVerseLabel: string;
    toVerseLabel: string;
    typeLabel: string;
    typePlaceholder: string;
    evaluationLabel: string;
    notesLabel: string;
    submit: string;
  };

  editRecordDialog: {
    title: string;
    description: string;
    submit: string;
  };

  deleteRecordDialog: {
    title: string;
    description: string;
    confirm: string;
  };

  memorizationType: {
    newMemorization: string;
    revision: string;
  };

  recordsList: {
    heading: string;
    title: string;
    description: string;
  };

  toast: {
    error: string;
    fillRequired: string;
    selectCircleAndStudent: string;
    fillRecordRequired: string;
    addedTitle: string;
    circleAdded: string;
    editedTitle: string;
    circleEdited: string;
    deletedTitle: string;
    circleDeleted: string;
    memberAdded: string;
    recordAdded: string;
    recordEdited: string;
    recordDeleted: string;
  };
}

export const quranCircles: Record<Language, QuranCirclesTranslations> = {
  ar: {
    pageTitle: 'حلقات القرآن',
    heading: 'حلقات القرآن',
    description: 'إدارة حلقات القرآن ومتابعة تقدم الطلاب في الحفظ والمراجعة',
    searchPlaceholder: 'البحث عن حلقة...',

    tabs: {
      circles: 'الحلقات',
      members: 'الأعضاء',
      records: 'سجلات الحفظ',
    },

    status: {
      active: 'نشطة',
      inactive: 'غير نشطة',
    },

    circleList: {
      title: 'قائمة الحلقات',
      description: 'عرض وإدارة جميع حلقات القرآن',
    },

    circleCard: {
      supervisor: 'المشرف:',
      dailyMemorization: 'ورد الحفظ:',
      dailyRevision: 'ورد المراجعة:',
      memberCount: 'عدد الأعضاء:',
    },

    actions: {
      view: 'عرض',
      edit: 'تعديل',
      delete: 'حذف',
      cancel: 'إلغاء',
    },

    tableHeaders: {
      circleName: 'اسم الحلقة',
      supervisor: 'المشرف',
      dailyMemorization: 'ورد الحفظ',
      dailyRevision: 'ورد المراجعة',
      memberCount: 'عدد الأعضاء',
      status: 'الحالة',
      actions: 'الإجراءات',
      student: 'الطالب',
      circle: 'الحلقة',
      surah: 'السورة',
      verses: 'الآيات',
      type: 'النوع',
      evaluation: 'التقييم',
      date: 'التاريخ',
    },

    addCircleDialog: {
      trigger: 'إنشاء حلقة جديدة',
      title: 'إنشاء حلقة جديدة',
      description: 'أدخل بيانات الحلقة الجديدة',
      nameLabel: 'اسم الحلقة',
      supervisorLabel: 'المشرف',
      supervisorPlaceholder: 'اختر المشرف',
      descriptionLabel: 'الوصف',
      dailyMemorizationLabel: 'ورد الحفظ اليومي',
      dailyRevisionLabel: 'ورد المراجعة اليومي',
      weeklyEvaluationLabel: 'التقييم الأسبوعي',
      submit: 'إنشاء حلقة',
    },

    editCircleDialog: {
      title: 'تعديل الحلقة',
      description: 'قم بتعديل بيانات الحلقة',
      nameLabel: 'اسم الحلقة',
      supervisorLabel: 'المشرف',
      supervisorPlaceholder: 'اختر المشرف',
      descriptionLabel: 'الوصف',
      dailyMemorizationLabel: 'ورد الحفظ اليومي',
      dailyRevisionLabel: 'ورد المراجعة اليومي',
      weeklyEvaluationLabel: 'التقييم الأسبوعي',
      submit: 'حفظ التعديلات',
    },

    deleteCircleDialog: {
      title: 'تأكيد الحذف',
      description: 'هل أنت متأكد من حذف الحلقة "{{name}}"؟ لا يمكن التراجع عن هذا الإجراء.',
      confirm: 'حذف',
    },

    addMemberDialog: {
      trigger: 'إضافة طالب',
      title: 'إضافة طالب لحلقة',
      description: 'اختر الحلقة والطالب المراد إضافته',
      circleLabel: 'الحلقة',
      circlePlaceholder: 'اختر الحلقة',
      studentLabel: 'الطالب',
      studentPlaceholder: 'اختر الطالب',
      submit: 'إضافة طالب',
    },

    members: {
      sectionTitle: 'أعضاء الحلقة',
      joinedPrefix: 'انضم:',
    },

    addRecordDialog: {
      trigger: 'إضافة سجل جديد',
      title: 'إضافة سجل حفظ جديد',
      description: 'أدخل بيانات سجل الحفظ الجديد',
      circleLabel: 'الحلقة',
      circlePlaceholder: 'اختر الحلقة',
      studentLabel: 'الطالب',
      studentPlaceholder: 'اختر الطالب',
      surahLabel: 'السورة',
      fromVerseLabel: 'من آية',
      toVerseLabel: 'إلى آية',
      typeLabel: 'النوع',
      typePlaceholder: 'اختر النوع',
      evaluationLabel: 'التقييم (من 10)',
      notesLabel: 'ملاحظات',
      submit: 'إضافة سجل',
    },

    editRecordDialog: {
      title: 'تعديل سجل الحفظ',
      description: 'قم بتعديل بيانات سجل الحفظ',
      submit: 'حفظ التعديلات',
    },

    deleteRecordDialog: {
      title: 'تأكيد الحذف',
      description: 'هل أنت متأكد من حذف هذا السجل؟ لا يمكن التراجع عن هذا الإجراء.',
      confirm: 'حذف',
    },

    memorizationType: {
      newMemorization: 'حفظ جديد',
      revision: 'مراجعة',
    },

    recordsList: {
      heading: 'سجلات الحفظ والمراجعة',
      title: 'سجلات الحفظ',
      description: 'عرض جميع سجلات الحفظ والمراجعة للطلاب',
    },

    toast: {
      error: 'خطأ',
      fillRequired: 'يرجى ملء جميع الحقول المطلوبة',
      selectCircleAndStudent: 'يرجى اختيار الحلقة والطالب',
      fillRecordRequired: 'يرجى ملء جميع الحقول المطلوبة',
      addedTitle: 'تم الإضافة',
      circleAdded: 'تم إضافة الحلقة بنجاح',
      editedTitle: 'تم التعديل',
      circleEdited: 'تم تعديل الحلقة بنجاح',
      deletedTitle: 'تم الحذف',
      circleDeleted: 'تم حذف الحلقة بنجاح',
      memberAdded: 'تم إضافة الطالب للحلقة بنجاح',
      recordAdded: 'تم إضافة سجل الحفظ بنجاح',
      recordEdited: 'تم تعديل سجل الحفظ بنجاح',
      recordDeleted: 'تم حذف سجل الحفظ بنجاح',
    },
  },

  en: {
    pageTitle: 'Quran Circles',
    heading: 'Quran Circles',
    description: 'Manage Quran circles and track student progress in memorization and revision',
    searchPlaceholder: 'Search for a circle...',

    tabs: {
      circles: 'Circles',
      members: 'Members',
      records: 'Memorization Records',
    },

    status: {
      active: 'Active',
      inactive: 'Inactive',
    },

    circleList: {
      title: 'Circles List',
      description: 'View and manage all Quran circles',
    },

    circleCard: {
      supervisor: 'Supervisor:',
      dailyMemorization: 'Daily Memorization:',
      dailyRevision: 'Daily Revision:',
      memberCount: 'Members:',
    },

    actions: {
      view: 'View',
      edit: 'Edit',
      delete: 'Delete',
      cancel: 'Cancel',
    },

    tableHeaders: {
      circleName: 'Circle Name',
      supervisor: 'Supervisor',
      dailyMemorization: 'Daily Memorization',
      dailyRevision: 'Daily Revision',
      memberCount: 'Members',
      status: 'Status',
      actions: 'Actions',
      student: 'Student',
      circle: 'Circle',
      surah: 'Surah',
      verses: 'Verses',
      type: 'Type',
      evaluation: 'Evaluation',
      date: 'Date',
    },

    addCircleDialog: {
      trigger: 'Create New Circle',
      title: 'Create New Circle',
      description: 'Enter the new circle details',
      nameLabel: 'Circle Name',
      supervisorLabel: 'Supervisor',
      supervisorPlaceholder: 'Select supervisor',
      descriptionLabel: 'Description',
      dailyMemorizationLabel: 'Daily Memorization',
      dailyRevisionLabel: 'Daily Revision',
      weeklyEvaluationLabel: 'Weekly Evaluation',
      submit: 'Create Circle',
    },

    editCircleDialog: {
      title: 'Edit Circle',
      description: 'Edit the circle details',
      nameLabel: 'Circle Name',
      supervisorLabel: 'Supervisor',
      supervisorPlaceholder: 'Select supervisor',
      descriptionLabel: 'Description',
      dailyMemorizationLabel: 'Daily Memorization',
      dailyRevisionLabel: 'Daily Revision',
      weeklyEvaluationLabel: 'Weekly Evaluation',
      submit: 'Save Changes',
    },

    deleteCircleDialog: {
      title: 'Confirm Deletion',
      description: 'Are you sure you want to delete the circle "{{name}}"? This action cannot be undone.',
      confirm: 'Delete',
    },

    addMemberDialog: {
      trigger: 'Add Student',
      title: 'Add Student to Circle',
      description: 'Select the circle and the student to add',
      circleLabel: 'Circle',
      circlePlaceholder: 'Select circle',
      studentLabel: 'Student',
      studentPlaceholder: 'Select student',
      submit: 'Add Student',
    },

    members: {
      sectionTitle: 'Circle Members',
      joinedPrefix: 'Joined:',
    },

    addRecordDialog: {
      trigger: 'Add New Record',
      title: 'Add New Memorization Record',
      description: 'Enter the new memorization record details',
      circleLabel: 'Circle',
      circlePlaceholder: 'Select circle',
      studentLabel: 'Student',
      studentPlaceholder: 'Select student',
      surahLabel: 'Surah',
      fromVerseLabel: 'From Verse',
      toVerseLabel: 'To Verse',
      typeLabel: 'Type',
      typePlaceholder: 'Select type',
      evaluationLabel: 'Evaluation (out of 10)',
      notesLabel: 'Notes',
      submit: 'Add Record',
    },

    editRecordDialog: {
      title: 'Edit Memorization Record',
      description: 'Edit the memorization record details',
      submit: 'Save Changes',
    },

    deleteRecordDialog: {
      title: 'Confirm Deletion',
      description: 'Are you sure you want to delete this record? This action cannot be undone.',
      confirm: 'Delete',
    },

    memorizationType: {
      newMemorization: 'New Memorization',
      revision: 'Revision',
    },

    recordsList: {
      heading: 'Memorization & Revision Records',
      title: 'Memorization Records',
      description: 'View all memorization and revision records for students',
    },

    toast: {
      error: 'Error',
      fillRequired: 'Please fill all required fields',
      selectCircleAndStudent: 'Please select the circle and student',
      fillRecordRequired: 'Please fill all required fields',
      addedTitle: 'Added',
      circleAdded: 'Circle added successfully',
      editedTitle: 'Updated',
      circleEdited: 'Circle updated successfully',
      deletedTitle: 'Deleted',
      circleDeleted: 'Circle deleted successfully',
      memberAdded: 'Student added to circle successfully',
      recordAdded: 'Memorization record added successfully',
      recordEdited: 'Memorization record updated successfully',
      recordDeleted: 'Memorization record deleted successfully',
    },
  },
};
