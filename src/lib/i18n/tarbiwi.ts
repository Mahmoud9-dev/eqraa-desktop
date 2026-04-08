import type { Language } from './types';

export interface TarbiwiTranslations {
  pageTitle: string;
  pageIcon: string;
  subtitle: string;
  searchPlaceholder: string;

  tabs: {
    programs: string;
    assignments: string;
    assessments: string;
    content: string;
  };

  programs: {
    cardTitle: string;
    cardDescription: string;
    addButton: string;
    addDialogTitle: string;
    addDialogDescription: string;
    editDialogTitle: string;
    editDialogDescription: string;
    deleteDialogTitle: string;
    /** Use {{title}} placeholder */
    deleteDialogDescription: string;
    table: {
      title: string;
      day: string;
      time: string;
      duration: string;
      targetAge: string;
      status: string;
      actions: string;
    };
    form: {
      title: string;
      description: string;
      day: string;
      dayPlaceholder: string;
      time: string;
      durationMinutes: string;
      targetAge: string;
    };
    minuteUnit: string;
    status: {
      active: string;
      inactive: string;
    };
    actions: {
      view: string;
      edit: string;
      delete: string;
    };
    toast: {
      addSuccess: string;
      addSuccessDescription: string;
      editSuccess: string;
      editSuccessDescription: string;
      deleteSuccess: string;
      deleteSuccessDescription: string;
      validationError: string;
      validationErrorDescription: string;
    };
    createButton: string;
    saveButton: string;
  };

  assignments: {
    cardTitle: string;
    cardDescription: string;
    addButton: string;
    addDialogTitle: string;
    addDialogDescription: string;
    editDialogTitle: string;
    editDialogDescription: string;
    deleteDialogTitle: string;
    /** Use {{title}} placeholder */
    deleteDialogDescription: string;
    table: {
      title: string;
      type: string;
      dueDate: string;
      targetAge: string;
      points: string;
      status: string;
      actions: string;
    };
    form: {
      title: string;
      type: string;
      typePlaceholder: string;
      description: string;
      dueDate: string;
      targetAge: string;
      points: string;
    };
    typeLabels: {
      worship: string;
      behavioral: string;
    };
    status: {
      active: string;
      inactive: string;
    };
    actions: {
      view: string;
      edit: string;
      delete: string;
    };
    toast: {
      addSuccess: string;
      addSuccessDescription: string;
      editSuccess: string;
      editSuccessDescription: string;
      deleteSuccess: string;
      deleteSuccessDescription: string;
      validationError: string;
      validationErrorDescription: string;
    };
    addSubmitButton: string;
    saveButton: string;
  };

  assessments: {
    sectionTitle: string;
    addButton: string;
    addDialogTitle: string;
    addDialogDescription: string;
    cardTitle: string;
    cardDescription: string;
    table: {
      student: string;
      criteria: string;
      rating: string;
      date: string;
      evaluator: string;
      notes: string;
      actions: string;
    };
    form: {
      student: string;
      studentPlaceholder: string;
      criteria: string;
      ratingOutOf10: string;
      notes: string;
    };
    actions: {
      edit: string;
      delete: string;
    };
    toast: {
      addSuccess: string;
      addSuccessDescription: string;
      deleteSuccess: string;
      deleteSuccessDescription: string;
      validationError: string;
      validationErrorDescription: string;
    };
    addSubmitButton: string;
  };

  content: {
    articles: {
      cardTitle: string;
      cardDescription: string;
      publishedPrefix: string;
    };
    videos: {
      cardTitle: string;
      cardDescription: string;
      durationPrefix: string;
      watchButton: string;
    };
  };

  days: {
    sunday: string;
    monday: string;
    tuesday: string;
    wednesday: string;
    thursday: string;
    friday: string;
    saturday: string;
  };

  common: {
    cancel: string;
    delete: string;
    save: string;
  };
}

export const tarbiwi: Record<Language, TarbiwiTranslations> = {
  ar: {
    pageTitle: 'الجانب التربوي',
    pageIcon: '\u{1F54C}',
    subtitle: 'إدارة البرامج التربوية والواجبات السلوكية والتقييمات',
    searchPlaceholder: 'البحث عن برنامج...',

    tabs: {
      programs: 'البرامج الأسبوعية',
      assignments: 'الواجبات السلوكية',
      assessments: 'التقييمات التربوية',
      content: 'محتوى تربوي',
    },

    programs: {
      cardTitle: 'البرامج الأسبوعية',
      cardDescription: 'عرض وإدارة جميع البرامج التربوية الأسبوعية',
      addButton: 'إنشاء برنامج جديد',
      addDialogTitle: 'إنشاء برنامج جديد',
      addDialogDescription: 'أدخل بيانات البرنامج الجديد',
      editDialogTitle: 'تعديل البرنامج',
      editDialogDescription: 'قم بتعديل بيانات البرنامج',
      deleteDialogTitle: 'تأكيد الحذف',
      deleteDialogDescription: 'هل أنت متأكد من حذف البرنامج "{{title}}"؟ لا يمكن التراجع عن هذا الإجراء.',
      table: {
        title: 'عنوان البرنامج',
        day: 'اليوم',
        time: 'الوقت',
        duration: 'المدة',
        targetAge: 'الفئة العمرية',
        status: 'الحالة',
        actions: 'الإجراءات',
      },
      form: {
        title: 'العنوان',
        description: 'الوصف',
        day: 'اليوم',
        dayPlaceholder: 'اختر اليوم',
        time: 'الوقت',
        durationMinutes: 'المدة (دقائق)',
        targetAge: 'الفئة العمرية',
      },
      minuteUnit: 'دقيقة',
      status: {
        active: 'نشط',
        inactive: 'غير نشط',
      },
      actions: {
        view: 'عرض',
        edit: 'تعديل',
        delete: 'حذف',
      },
      toast: {
        addSuccess: 'تم الإضافة',
        addSuccessDescription: 'تم إضافة البرنامج بنجاح',
        editSuccess: 'تم التعديل',
        editSuccessDescription: 'تم تعديل البرنامج بنجاح',
        deleteSuccess: 'تم الحذف',
        deleteSuccessDescription: 'تم حذف البرنامج بنجاح',
        validationError: 'خطأ',
        validationErrorDescription: 'يرجى ملء جميع الحقول المطلوبة',
      },
      createButton: 'إنشاء برنامج',
      saveButton: 'حفظ التعديلات',
    },

    assignments: {
      cardTitle: 'الواجبات السلوكية والعبادية',
      cardDescription: 'عرض وإدارة جميع الواجبات السلوكية والعبادية',
      addButton: 'إضافة واجب',
      addDialogTitle: 'إضافة واجب جديد',
      addDialogDescription: 'أدخل بيانات الواجب الجديد',
      editDialogTitle: 'تعديل الواجب',
      editDialogDescription: 'قم بتعديل بيانات الواجب',
      deleteDialogTitle: 'تأكيد الحذف',
      deleteDialogDescription: 'هل أنت متأكد من حذف الواجب "{{title}}"؟ لا يمكن التراجع عن هذا الإجراء.',
      table: {
        title: 'عنوان الواجب',
        type: 'النوع',
        dueDate: 'تاريخ التسليم',
        targetAge: 'الفئة العمرية',
        points: 'النقاط',
        status: 'الحالة',
        actions: 'الإجراءات',
      },
      form: {
        title: 'العنوان',
        type: 'النوع',
        typePlaceholder: 'اختر النوع',
        description: 'الوصف',
        dueDate: 'تاريخ التسليم',
        targetAge: 'الفئة العمرية',
        points: 'النقاط',
      },
      typeLabels: {
        worship: 'عبادية',
        behavioral: 'سلوكية',
      },
      status: {
        active: 'نشط',
        inactive: 'غير نشط',
      },
      actions: {
        view: 'عرض',
        edit: 'تعديل',
        delete: 'حذف',
      },
      toast: {
        addSuccess: 'تم الإضافة',
        addSuccessDescription: 'تم إضافة الواجب بنجاح',
        editSuccess: 'تم التعديل',
        editSuccessDescription: 'تم تعديل الواجب بنجاح',
        deleteSuccess: 'تم الحذف',
        deleteSuccessDescription: 'تم حذف الواجب بنجاح',
        validationError: 'خطأ',
        validationErrorDescription: 'يرجى ملء جميع الحقول المطلوبة',
      },
      addSubmitButton: 'إضافة واجب',
      saveButton: 'حفظ التعديلات',
    },

    assessments: {
      sectionTitle: 'التقييمات التربوية للطلاب',
      addButton: 'إضافة تقييم جديد',
      addDialogTitle: 'إضافة تقييم جديد',
      addDialogDescription: 'أدخل بيانات التقييم الجديد',
      cardTitle: 'سجل التقييمات',
      cardDescription: 'عرض جميع التقييمات التربوية للطلاب',
      table: {
        student: 'الطالب',
        criteria: 'معيار التقييم',
        rating: 'التقييم',
        date: 'التاريخ',
        evaluator: 'المقيم',
        notes: 'ملاحظات',
        actions: 'الإجراءات',
      },
      form: {
        student: 'الطالب',
        studentPlaceholder: 'اختر الطالب',
        criteria: 'معيار التقييم',
        ratingOutOf10: 'التقييم (من 10)',
        notes: 'ملاحظات',
      },
      actions: {
        edit: 'تعديل',
        delete: 'حذف',
      },
      toast: {
        addSuccess: 'تم الإضافة',
        addSuccessDescription: 'تم إضافة التقييم بنجاح',
        deleteSuccess: 'تم الحذف',
        deleteSuccessDescription: 'تم حذف التقييم بنجاح',
        validationError: 'خطأ',
        validationErrorDescription: 'يرجى ملء جميع الحقول المطلوبة',
      },
      addSubmitButton: 'إضافة تقييم',
    },

    content: {
      articles: {
        cardTitle: 'مقالات تربوية',
        cardDescription: 'مقالات قصيرة ومحتوى تربوي يومي',
        publishedPrefix: 'نشر:',
      },
      videos: {
        cardTitle: 'مقاطع فيديو تربوية',
        cardDescription: 'مقاطع قصيرة ومحتوى مرئي تربوي',
        durationPrefix: 'مدة:',
        watchButton: 'مشاهدة',
      },
    },

    days: {
      sunday: 'الأحد',
      monday: 'الإثنين',
      tuesday: 'الثلاثاء',
      wednesday: 'الأربعاء',
      thursday: 'الخميس',
      friday: 'الجمعة',
      saturday: 'السبت',
    },

    common: {
      cancel: 'إلغاء',
      delete: 'حذف',
      save: 'حفظ',
    },
  },

  en: {
    pageTitle: 'Educational Guidance',
    pageIcon: '\u{1F54C}',
    subtitle: 'Manage educational programs, behavioral assignments, and assessments',
    searchPlaceholder: 'Search for a program...',

    tabs: {
      programs: 'Weekly Programs',
      assignments: 'Behavioral Assignments',
      assessments: 'Educational Assessments',
      content: 'Educational Content',
    },

    programs: {
      cardTitle: 'Weekly Programs',
      cardDescription: 'View and manage all weekly educational programs',
      addButton: 'Create New Program',
      addDialogTitle: 'Create New Program',
      addDialogDescription: 'Enter the new program details',
      editDialogTitle: 'Edit Program',
      editDialogDescription: 'Modify program details',
      deleteDialogTitle: 'Confirm Deletion',
      deleteDialogDescription: 'Are you sure you want to delete the program "{{title}}"? This action cannot be undone.',
      table: {
        title: 'Program Title',
        day: 'Day',
        time: 'Time',
        duration: 'Duration',
        targetAge: 'Target Age',
        status: 'Status',
        actions: 'Actions',
      },
      form: {
        title: 'Title',
        description: 'Description',
        day: 'Day',
        dayPlaceholder: 'Select day',
        time: 'Time',
        durationMinutes: 'Duration (minutes)',
        targetAge: 'Target Age',
      },
      minuteUnit: 'min',
      status: {
        active: 'Active',
        inactive: 'Inactive',
      },
      actions: {
        view: 'View',
        edit: 'Edit',
        delete: 'Delete',
      },
      toast: {
        addSuccess: 'Added',
        addSuccessDescription: 'Program added successfully',
        editSuccess: 'Updated',
        editSuccessDescription: 'Program updated successfully',
        deleteSuccess: 'Deleted',
        deleteSuccessDescription: 'Program deleted successfully',
        validationError: 'Error',
        validationErrorDescription: 'Please fill in all required fields',
      },
      createButton: 'Create Program',
      saveButton: 'Save Changes',
    },

    assignments: {
      cardTitle: 'Behavioral & Worship Assignments',
      cardDescription: 'View and manage all behavioral and worship assignments',
      addButton: 'Add Assignment',
      addDialogTitle: 'Add New Assignment',
      addDialogDescription: 'Enter the new assignment details',
      editDialogTitle: 'Edit Assignment',
      editDialogDescription: 'Modify assignment details',
      deleteDialogTitle: 'Confirm Deletion',
      deleteDialogDescription: 'Are you sure you want to delete the assignment "{{title}}"? This action cannot be undone.',
      table: {
        title: 'Assignment Title',
        type: 'Type',
        dueDate: 'Due Date',
        targetAge: 'Target Age',
        points: 'Points',
        status: 'Status',
        actions: 'Actions',
      },
      form: {
        title: 'Title',
        type: 'Type',
        typePlaceholder: 'Select type',
        description: 'Description',
        dueDate: 'Due Date',
        targetAge: 'Target Age',
        points: 'Points',
      },
      typeLabels: {
        worship: 'Worship',
        behavioral: 'Behavioral',
      },
      status: {
        active: 'Active',
        inactive: 'Inactive',
      },
      actions: {
        view: 'View',
        edit: 'Edit',
        delete: 'Delete',
      },
      toast: {
        addSuccess: 'Added',
        addSuccessDescription: 'Assignment added successfully',
        editSuccess: 'Updated',
        editSuccessDescription: 'Assignment updated successfully',
        deleteSuccess: 'Deleted',
        deleteSuccessDescription: 'Assignment deleted successfully',
        validationError: 'Error',
        validationErrorDescription: 'Please fill in all required fields',
      },
      addSubmitButton: 'Add Assignment',
      saveButton: 'Save Changes',
    },

    assessments: {
      sectionTitle: 'Student Educational Assessments',
      addButton: 'Add New Assessment',
      addDialogTitle: 'Add New Assessment',
      addDialogDescription: 'Enter the new assessment details',
      cardTitle: 'Assessment Records',
      cardDescription: 'View all student educational assessments',
      table: {
        student: 'Student',
        criteria: 'Assessment Criteria',
        rating: 'Rating',
        date: 'Date',
        evaluator: 'Evaluator',
        notes: 'Notes',
        actions: 'Actions',
      },
      form: {
        student: 'Student',
        studentPlaceholder: 'Select student',
        criteria: 'Assessment Criteria',
        ratingOutOf10: 'Rating (out of 10)',
        notes: 'Notes',
      },
      actions: {
        edit: 'Edit',
        delete: 'Delete',
      },
      toast: {
        addSuccess: 'Added',
        addSuccessDescription: 'Assessment added successfully',
        deleteSuccess: 'Deleted',
        deleteSuccessDescription: 'Assessment deleted successfully',
        validationError: 'Error',
        validationErrorDescription: 'Please fill in all required fields',
      },
      addSubmitButton: 'Add Assessment',
    },

    content: {
      articles: {
        cardTitle: 'Educational Articles',
        cardDescription: 'Short articles and daily educational content',
        publishedPrefix: 'Published:',
      },
      videos: {
        cardTitle: 'Educational Videos',
        cardDescription: 'Short clips and visual educational content',
        durationPrefix: 'Duration:',
        watchButton: 'Watch',
      },
    },

    days: {
      sunday: 'Sunday',
      monday: 'Monday',
      tuesday: 'Tuesday',
      wednesday: 'Wednesday',
      thursday: 'Thursday',
      friday: 'Friday',
      saturday: 'Saturday',
    },

    common: {
      cancel: 'Cancel',
      delete: 'Delete',
      save: 'Save',
    },
  },
};
