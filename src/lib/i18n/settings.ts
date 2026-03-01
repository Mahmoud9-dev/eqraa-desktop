import type { Language } from './types';

export interface SettingsTranslations {
  pageTitle: string;
  heading: string;
  headingDescription: string;
  sections: {
    account: string;
    appearance: string;
    language: string;
    notifications: string;
    security: string;
    users: string;
    system: string;
  };
  tabs: {
    profile: string;
    settings: string;
    users: string;
    permissions: string;
    system: string;
    notifications: string;
  };
  language: {
    label: string;
    arabic: string;
    english: string;
    current: string;
  };
  theme: {
    label: string;
    light: string;
    dark: string;
    system: string;
  };
  users: {
    title: string;
    table: {
      name: string;
      email: string;
      role: string;
      status: string;
      lastLogin: string;
      createdAt: string;
      actions: string;
    };
    actions: {
      addUser: string;
      addNewUser: string;
      editUser: string;
      deleteUser: string;
      changePassword: string;
      view: string;
    };
    roles: {
      admin: string;
      teacher: string;
      student: string;
      parent: string;
      viewer: string;
    };
    status: {
      active: string;
      inactive: string;
    };
    listTitle: string;
    listDescription: string;
    deleteConfirm: string;
    deleteConfirmWithName: string;
    empty: string;
    neverLoggedIn: string;
    selectRole: string;
  };
  profile: {
    avatarTitle: string;
    avatarDescription: string;
    changeAvatar: string;
    infoTitle: string;
    infoDescription: string;
    name: string;
    fullName: string;
    email: string;
    phone: string;
    role: string;
    saveChanges: string;
    changePassword: string;
    changePasswordDescription: string;
    currentPassword: string;
    newPassword: string;
    confirmPassword: string;
    changePasswordButton: string;
  };
  generalSettings: {
    title: string;
    description: string;
    saveSettings: string;
  };
  permissions: {
    availableFor: string;
    roles: {
      admin: string[];
      teacher: string[];
      student: string[];
      parent: string[];
      viewer: string[];
    };
  };
  system: {
    info: {
      title: string;
      description: string;
      version: string;
      releaseDate: string;
      environment: string;
      environmentValue: string;
      database: string;
    };
    backup: {
      title: string;
      description: string;
      lastBackup: string;
      backupSize: string;
      autoBackup: string;
      autoBackupEnabled: string;
      createNow: string;
      restore: string;
    };
    logs: {
      title: string;
      description: string;
      totalUsers: string;
      totalStudents: string;
      totalTeachers: string;
      sessionsToday: string;
      viewAll: string;
    };
    maintenance: {
      title: string;
      description: string;
      clearCache: string;
      rebuildIndexes: string;
      optimizeDb: string;
      healthCheck: string;
    };
  };
  toasts: {
    addSuccess: string;
    addSuccessDescription: string;
    editSuccess: string;
    editSuccessDescription: string;
    deleteSuccess: string;
    deleteSuccessDescription: string;
    passwordChanged: string;
    passwordChangedDescription: string;
    passwordMismatch: string;
    passwordMismatchDescription: string;
    settingsUpdated: string;
    settingsUpdatedDescription: string;
    profileUpdated: string;
    profileUpdatedDescription: string;
    error: string;
    requiredFields: string;
    backupSuccess: string;
    backupSuccessDescription: string;
    backupError: string;
    backupErrorDescription: string;
    restoreSuccess: string;
    restoreSuccessDescription: string;
    restoreError: string;
    restoreErrorDescription: string;
  };
  addUserDialog: {
    title: string;
    description: string;
    nameLabel: string;
    emailLabel: string;
    passwordLabel: string;
    roleLabel: string;
    submitButton: string;
  };
  editUserDialog: {
    title: string;
    description: string;
    nameLabel: string;
    emailLabel: string;
    roleLabel: string;
    saveButton: string;
  };
  deleteDialog: {
    title: string;
    description: string;
  };
  changePasswordDialog: {
    title: string;
    description: string;
    currentLabel: string;
    newLabel: string;
    confirmLabel: string;
    submitButton: string;
  };
  saveSuccess: string;
  saveError: string;
}

export const settings: Record<Language, SettingsTranslations> = {
  ar: {
    pageTitle: 'الإعدادات',
    heading: 'الإعدادات والصلاحيات',
    headingDescription: 'إدارة الإعدادات الشخصية والصلاحيات والتحكم في النظام',
    sections: {
      account: 'الحساب',
      appearance: 'المظهر',
      language: 'اللغة',
      notifications: 'الإشعارات',
      security: 'الأمان',
      users: 'المستخدمون',
      system: 'النظام',
    },
    tabs: {
      profile: 'الملف الشخصي',
      settings: 'الإعدادات',
      users: 'المستخدمون',
      permissions: 'الصلاحيات',
      system: 'النظام',
      notifications: 'الإشعارات',
    },
    language: {
      label: 'اللغة',
      arabic: 'العربية',
      english: 'English',
      current: 'اللغة الحالية',
    },
    theme: {
      label: 'المظهر',
      light: 'فاتح',
      dark: 'داكن',
      system: 'تلقائي',
    },
    users: {
      title: 'إدارة المستخدمين',
      table: {
        name: 'الاسم',
        email: 'البريد الإلكتروني',
        role: 'الدور',
        status: 'الحالة',
        lastLogin: 'آخر تسجيل',
        createdAt: 'تاريخ الإنشاء',
        actions: 'الإجراءات',
      },
      actions: {
        addUser: 'إضافة مستخدم',
        addNewUser: 'إضافة مستخدم جديد',
        editUser: 'تعديل مستخدم',
        deleteUser: 'حذف مستخدم',
        changePassword: 'تغيير كلمة المرور',
        view: 'عرض',
      },
      roles: {
        admin: 'الإدارة',
        teacher: 'المدرس',
        student: 'الطالب',
        parent: 'ولي الأمر',
        viewer: 'المشاهد',
      },
      status: {
        active: 'نشط',
        inactive: 'غير نشط',
      },
      listTitle: 'قائمة المستخدمين',
      listDescription: 'عرض وإدارة جميع مستخدمي النظام',
      deleteConfirm: 'هل أنت متأكد من حذف هذا المستخدم؟',
      deleteConfirmWithName: 'هل أنت متأكد من حذف المستخدم "{{name}}"؟ لا يمكن التراجع عن هذا الإجراء.',
      empty: 'لا يوجد مستخدمون',
      neverLoggedIn: 'لم يسجل بعد',
      selectRole: 'اختر الدور',
    },
    profile: {
      avatarTitle: 'الصورة الشخصية',
      avatarDescription: 'تحديث صورتك الشخصية',
      changeAvatar: 'تغيير الصورة',
      infoTitle: 'المعلومات الشخصية',
      infoDescription: 'تحديث معلوماتك الشخصية',
      name: 'الاسم',
      fullName: 'الاسم الكامل',
      email: 'البريد الإلكتروني',
      phone: 'رقم الهاتف',
      role: 'الدور',
      saveChanges: 'حفظ التغييرات',
      changePassword: 'تغيير كلمة المرور',
      changePasswordDescription: 'تغيير كلمة المرور الخاصة بحسابك',
      currentPassword: 'كلمة المرور الحالية',
      newPassword: 'كلمة المرور الجديدة',
      confirmPassword: 'تأكيد كلمة المرور',
      changePasswordButton: 'تغيير كلمة المرور',
    },
    generalSettings: {
      title: 'الإعدادات العامة',
      description: 'تخصيص إعدادات التطبيق',
      saveSettings: 'حفظ الإعدادات',
    },
    permissions: {
      availableFor: 'الصلاحيات المتاحة لدور {{role}}',
      roles: {
        admin: [
          'التحكم الكامل في النظام',
          'إدارة المستخدمين والصلاحيات',
          'إدارة جميع البيانات',
          'عرض التقارير والإحصائيات',
          'إدارة الإعدادات العامة',
        ],
        teacher: [
          'إدارة الطلاب المسؤولين',
          'إضافة وتعديل الدروس والمحتوى',
          'تقييم الطلاب',
          'عرض التقارير الخاصة بالطلاب',
          'إدارة الجداول الخاصة',
        ],
        student: [
          'عرض بياناتي الشخصية',
          'عرض الدروس والمحتوى',
          'المشاركة في الاختبارات',
          'عرض جدولي الدراسي',
          'عرض تقاريري الشخصية',
        ],
        parent: [
          'عرض بيانات الأبناء',
          'عرض أداء الأبناء',
          'متابعة الحضور والغياب',
          'عرض التقارير الخاصة بالأبناء',
          'التواصل مع المدرسين',
        ],
        viewer: [
          'عرض البيانات العامة',
          'عرض التقارير والإحصائيات',
          'عرض المحتوى التعليمي',
          'عرض الجداول العامة',
        ],
      },
    },
    system: {
      info: {
        title: 'معلومات النظام',
        description: 'معلومات حول النظام والإصدار',
        version: 'إصدار النظام:',
        releaseDate: 'تاريخ الإصدار:',
        environment: 'البيئة:',
        environmentValue: 'تطوير',
        database: 'قاعدة البيانات:',
      },
      backup: {
        title: 'النسخ الاحتياطية',
        description: 'إدارة النسخ الاحتياطية للبيانات',
        lastBackup: 'آخر نسخة احتياطية:',
        backupSize: 'حجم النسخة:',
        autoBackup: 'النسخ التلقائية:',
        autoBackupEnabled: 'مفعل',
        createNow: 'إنشاء نسخة الآن',
        restore: 'استعادة نسخة',
      },
      logs: {
        title: 'السجلات',
        description: 'عرض سجلات النظام والأنشطة',
        totalUsers: 'عدد المستخدمين:',
        totalStudents: 'عدد الطلاب:',
        totalTeachers: 'عدد المدرسين:',
        sessionsToday: 'عدد الجلسات اليوم:',
        viewAll: 'عرض السجلات الكاملة',
      },
      maintenance: {
        title: 'الصيانة',
        description: 'أدوات الصيانة والتحسين',
        clearCache: 'تنظيف ذاكرة التخزين المؤقت',
        rebuildIndexes: 'إعادة بناء الفهارس',
        optimizeDb: 'تحسين قاعدة البيانات',
        healthCheck: 'فحص سلامة النظام',
      },
    },
    toasts: {
      addSuccess: 'تم الإضافة',
      addSuccessDescription: 'تم إضافة المستخدم بنجاح',
      editSuccess: 'تم التعديل',
      editSuccessDescription: 'تم تعديل المستخدم بنجاح',
      deleteSuccess: 'تم الحذف',
      deleteSuccessDescription: 'تم حذف المستخدم بنجاح',
      passwordChanged: 'تم التغيير',
      passwordChangedDescription: 'تم تغيير كلمة المرور بنجاح',
      passwordMismatch: 'خطأ',
      passwordMismatchDescription: 'كلمة المرور الجديدة وتأكيد الكلمة غير متطابقين',
      settingsUpdated: 'تم التحديث',
      settingsUpdatedDescription: 'تم تحديث الإعدادات بنجاح',
      profileUpdated: 'تم التحديث',
      profileUpdatedDescription: 'تم تحديث الملف الشخصي بنجاح',
      error: 'خطأ',
      requiredFields: 'يرجى ملء جميع الحقول المطلوبة',
      backupSuccess: 'تم التصدير',
      backupSuccessDescription: 'تم تصدير قاعدة البيانات بنجاح',
      backupError: 'خطأ في التصدير',
      backupErrorDescription: 'فشل تصدير قاعدة البيانات',
      restoreSuccess: 'تم الاستيراد',
      restoreSuccessDescription: 'تم استيراد قاعدة البيانات بنجاح. يرجى إعادة تشغيل التطبيق.',
      restoreError: 'خطأ في الاستيراد',
      restoreErrorDescription: 'فشل استيراد قاعدة البيانات',
    },
    addUserDialog: {
      title: 'إضافة مستخدم جديد',
      description: 'أدخل بيانات المستخدم الجديد',
      nameLabel: 'الاسم',
      emailLabel: 'البريد الإلكتروني',
      passwordLabel: 'كلمة المرور',
      roleLabel: 'الدور',
      submitButton: 'إضافة مستخدم',
    },
    editUserDialog: {
      title: 'تعديل المستخدم',
      description: 'قم بتعديل بيانات المستخدم',
      nameLabel: 'الاسم',
      emailLabel: 'البريد الإلكتروني',
      roleLabel: 'الدور',
      saveButton: 'حفظ التعديلات',
    },
    deleteDialog: {
      title: 'تأكيد الحذف',
      description: 'هل أنت متأكد من حذف المستخدم "{{name}}"؟ لا يمكن التراجع عن هذا الإجراء.',
    },
    changePasswordDialog: {
      title: 'تغيير كلمة المرور',
      description: 'أدخل بيانات تغيير كلمة المرور',
      currentLabel: 'كلمة المرور الحالية',
      newLabel: 'كلمة المرور الجديدة',
      confirmLabel: 'تأكيد كلمة المرور',
      submitButton: 'تغيير كلمة المرور',
    },
    saveSuccess: 'تم حفظ الإعدادات',
    saveError: 'خطأ في حفظ الإعدادات',
  },
  en: {
    pageTitle: 'Settings',
    heading: 'Settings & Permissions',
    headingDescription: 'Manage personal settings, permissions, and system controls',
    sections: {
      account: 'Account',
      appearance: 'Appearance',
      language: 'Language',
      notifications: 'Notifications',
      security: 'Security',
      users: 'Users',
      system: 'System',
    },
    tabs: {
      profile: 'Profile',
      settings: 'Settings',
      users: 'Users',
      permissions: 'Permissions',
      system: 'System',
      notifications: 'Notifications',
    },
    language: {
      label: 'Language',
      arabic: 'Arabic',
      english: 'English',
      current: 'Current Language',
    },
    theme: {
      label: 'Theme',
      light: 'Light',
      dark: 'Dark',
      system: 'System',
    },
    users: {
      title: 'User Management',
      table: {
        name: 'Name',
        email: 'Email',
        role: 'Role',
        status: 'Status',
        lastLogin: 'Last Login',
        createdAt: 'Created At',
        actions: 'Actions',
      },
      actions: {
        addUser: 'Add User',
        addNewUser: 'Add New User',
        editUser: 'Edit User',
        deleteUser: 'Delete User',
        changePassword: 'Change Password',
        view: 'View',
      },
      roles: {
        admin: 'Admin',
        teacher: 'Teacher',
        student: 'Student',
        parent: 'Parent',
        viewer: 'Viewer',
      },
      status: {
        active: 'Active',
        inactive: 'Inactive',
      },
      listTitle: 'Users List',
      listDescription: 'View and manage all system users',
      deleteConfirm: 'Are you sure you want to delete this user?',
      deleteConfirmWithName: 'Are you sure you want to delete user "{{name}}"? This action cannot be undone.',
      empty: 'No users found',
      neverLoggedIn: 'Never logged in',
      selectRole: 'Select role',
    },
    profile: {
      avatarTitle: 'Profile Photo',
      avatarDescription: 'Update your profile photo',
      changeAvatar: 'Change Photo',
      infoTitle: 'Personal Information',
      infoDescription: 'Update your personal information',
      name: 'Name',
      fullName: 'Full Name',
      email: 'Email',
      phone: 'Phone Number',
      role: 'Role',
      saveChanges: 'Save Changes',
      changePassword: 'Change Password',
      changePasswordDescription: 'Change your account password',
      currentPassword: 'Current Password',
      newPassword: 'New Password',
      confirmPassword: 'Confirm Password',
      changePasswordButton: 'Change Password',
    },
    generalSettings: {
      title: 'General Settings',
      description: 'Customize application settings',
      saveSettings: 'Save Settings',
    },
    permissions: {
      availableFor: 'Permissions available for {{role}} role',
      roles: {
        admin: [
          'Full system control',
          'Manage users and permissions',
          'Manage all data',
          'View reports and statistics',
          'Manage general settings',
        ],
        teacher: [
          'Manage assigned students',
          'Add and edit lessons and content',
          'Evaluate students',
          'View student reports',
          'Manage personal schedules',
        ],
        student: [
          'View my personal data',
          'View lessons and content',
          'Participate in exams',
          'View my schedule',
          'View my personal reports',
        ],
        parent: [
          'View children\'s data',
          'View children\'s performance',
          'Track attendance',
          'View children\'s reports',
          'Communicate with teachers',
        ],
        viewer: [
          'View public data',
          'View reports and statistics',
          'View educational content',
          'View public schedules',
        ],
      },
    },
    system: {
      info: {
        title: 'System Information',
        description: 'Information about the system and version',
        version: 'System Version:',
        releaseDate: 'Release Date:',
        environment: 'Environment:',
        environmentValue: 'Development',
        database: 'Database:',
      },
      backup: {
        title: 'Backups',
        description: 'Manage data backups',
        lastBackup: 'Last Backup:',
        backupSize: 'Backup Size:',
        autoBackup: 'Auto Backups:',
        autoBackupEnabled: 'Enabled',
        createNow: 'Create Backup Now',
        restore: 'Restore Backup',
      },
      logs: {
        title: 'Logs',
        description: 'View system logs and activities',
        totalUsers: 'Total Users:',
        totalStudents: 'Total Students:',
        totalTeachers: 'Total Teachers:',
        sessionsToday: 'Sessions Today:',
        viewAll: 'View Full Logs',
      },
      maintenance: {
        title: 'Maintenance',
        description: 'Maintenance and optimization tools',
        clearCache: 'Clear Cache',
        rebuildIndexes: 'Rebuild Indexes',
        optimizeDb: 'Optimize Database',
        healthCheck: 'System Health Check',
      },
    },
    toasts: {
      addSuccess: 'Added',
      addSuccessDescription: 'User added successfully',
      editSuccess: 'Updated',
      editSuccessDescription: 'User updated successfully',
      deleteSuccess: 'Deleted',
      deleteSuccessDescription: 'User deleted successfully',
      passwordChanged: 'Changed',
      passwordChangedDescription: 'Password changed successfully',
      passwordMismatch: 'Error',
      passwordMismatchDescription: 'New password and confirmation do not match',
      settingsUpdated: 'Updated',
      settingsUpdatedDescription: 'Settings updated successfully',
      profileUpdated: 'Updated',
      profileUpdatedDescription: 'Profile updated successfully',
      error: 'Error',
      requiredFields: 'Please fill in all required fields',
      backupSuccess: 'Export Complete',
      backupSuccessDescription: 'Database exported successfully',
      backupError: 'Export Failed',
      backupErrorDescription: 'Failed to export database',
      restoreSuccess: 'Import Complete',
      restoreSuccessDescription: 'Database imported successfully. Please restart the application.',
      restoreError: 'Import Failed',
      restoreErrorDescription: 'Failed to import database',
    },
    addUserDialog: {
      title: 'Add New User',
      description: 'Enter new user details',
      nameLabel: 'Name',
      emailLabel: 'Email',
      passwordLabel: 'Password',
      roleLabel: 'Role',
      submitButton: 'Add User',
    },
    editUserDialog: {
      title: 'Edit User',
      description: 'Edit user details',
      nameLabel: 'Name',
      emailLabel: 'Email',
      roleLabel: 'Role',
      saveButton: 'Save Changes',
    },
    deleteDialog: {
      title: 'Confirm Deletion',
      description: 'Are you sure you want to delete user "{{name}}"? This action cannot be undone.',
    },
    changePasswordDialog: {
      title: 'Change Password',
      description: 'Enter password change details',
      currentLabel: 'Current Password',
      newLabel: 'New Password',
      confirmLabel: 'Confirm Password',
      submitButton: 'Change Password',
    },
    saveSuccess: 'Settings saved',
    saveError: 'Failed to save settings',
  },
};
