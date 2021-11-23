import { INavData } from '@coreui/angular';

export const navItems: INavData[] = [
  {
    name: 'Vaccine Management System',
    url: '/dashboard',
    icon: 'icon-speedometer',
    badge: {
      variant: 'info',
      text: 'NEW'
    }
  },
  {
    title: true,
    name: 'CONTROL PANEL',
  },
  {
    name: 'Settings',
    url: '/Setting',
    icon: 'icon-settings',
    children: [
      {
        name: 'STATE',
        url: '/Setting/States',
        icon: 'caret-right'
      },
      {
        name: 'Cities',
        url: '/Setting/cities',
        icon: 'caret-right'
      },
      {
        name: 'Localities',
        url: '/Setting/Localities',
        icon: 'caret-right'
      },
      {
        name: 'Health Unit',
        url: '/Setting/Health-Units',
        icon: 'caret-right'
      },
      {
        name: 'Addresses',
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
        name: 'Vaccines',
        url: '/Setting/Vaccines',
        icon: 'caret-right'
      },
      {
        name: 'Vaccines Distribution',
        url: '/Setting/Vaccine-Distribution',
        icon: 'caret-right'
      }
    ]
  },
  {
    name: 'Users Management',
    url: '/userManagement',
    icon: 'icon-cursor',
    children: [
      {
        name: 'New User',
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
