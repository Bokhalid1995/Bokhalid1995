import { INavData } from '@coreui/angular';

export const navItemsArabic: INavData[] = [
  {
    name: 'نظام تلقيح الكورونا',
    url: '/dashboard',
    icon: 'icon-speedometer',
    badge: {
      variant: 'info',
      text: 'NEW'
    }
  },
  {
    title: true,
    name: 'لوحة التحكم',
  },
  {
    name: 'الإعدادات',
    url: '/Setting',
    icon: 'icon-settings',
    children: [
      {
        name: 'الولايات',
        url: '/Setting/States',
        icon: 'caret-right'
      },
      {
        name: 'المدن',
        url: '/Setting/cities',
        icon: 'caret-right'
      },
      {
        name: 'المحليات',
        url: '/Setting/Localities',
        icon: 'caret-right'
      },
      {
        name: 'الوحدات الصحية',
        url: '/Setting/Health-Units',
        icon: 'caret-right'
      },
      {
        name: 'العناوين',
        url: '/Setting/Addresses',
        icon: 'caret-right'
      },
      /*{
        name: 'Units',
        url: '/Setting/Units',
        icon: 'caret-right'
      },
      {
        divider: true
      },
      {
        name: 'Departments',
        url: '/Setting/Departments',
        icon: 'caret-right'
      },
      {
        name: 'Sections',
        url: '/Setting/Sections',
        icon: 'caret-right'
      },*/
      {
        name: 'اللقاحات',
        url: '/Setting/Vaccines',
        icon: 'caret-right'
      },
      {
        name: ' توزيع اللقاحات',
        url: '/Setting/Vaccine-Distribution',
        icon: 'caret-right'
      }
    ]
  },
  {
    name: ' ادارة المستخدمين',
    url: '/userManagement',
    icon: 'icon-cursor',
    children: [
      {
        name: ' مستخدم جديد',
        url: '/userManagement/register-admin',
        icon: 'icon-caret-right'
      }
    ]
  },
  
    {
    name: 'Disabled',
    url: '/dashboard',
    icon: 'icon-ban',
    badge: {
      variant: 'secondary',
      text: 'NEW'
    },
    attributes: { disabled: true },
  },
 /* {
    name: 'Download CoreUI',
    url: 'http://coreui.io/angular/',
    icon: 'icon-cloud-download',
    class: 'mt-auto',
    variant: 'success',
    attributes: { target: '_blank', rel: 'noopener' }
  },
  {
    name: 'Try CoreUI PRO',
    url: 'http://coreui.io/pro/angular/',
    icon: 'icon-layers',
    variant: 'danger',
    attributes: { target: '_blank', rel: 'noopener' }
  }*/
];
