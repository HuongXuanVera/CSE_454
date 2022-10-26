export interface BUTTON {
  title?: string;
  name?: string;
  type?: string;
  button?: string;
  action?: string;
  icon?: string;
  value?: string;
  children?: any[];
  link?: string;
  color?: string;
  type_icon?: string;
}
export interface CHILDBUTTON {
  title: string;
  value: any;
}
export const Vehicle_Buttons: BUTTON[] = [
  {
    title: 'Trạm Thu Phí',
    type_icon: 'icon',
    icon: 'ti ti-home',
    button: 'dropdown',
    children: [],
    action: 'changeValue',
    name: 'tollbooth',
    color: 'primary',
  },
  {
    title: 'Từ ngày... đến ngày... ',
    type: 'date-range',
    button: 'input',
    name: 'date range',
    color: 'outline-primary',
    icon: 'fa fa-calendar',
  },
  {
    title: 'Biển số xe',
    icon: 'ti ti-car',
    type: 'text',
    name: 'license plates',
    button: 'input',
    color: 'outline-primary',
  },
  {
    title: 'Tìm',
    icon: 'search',
    button: 'button',
    action: 'getAllVideo',
    name: 'search',
    color: 'secondary',
  },
];
export const Postcheck_Buttons: BUTTON[] = [
  {
    title: 'Xem Trực Tiếp',
    type_icon: 'icon',
    icon: 'fe fe-tv',
    button: 'dropdown',
    children: [
      {
        title: 'Trạm Vĩnh Phú',
        value:
          'https://za.zalo.me/v3/verifyv2/pc?token=OcBrmjjsM05a3Vp3snvVPsSA-RBR6K9nRXFaim&continue=http%3A%2F%2F128.199.124.231%3A8082%2Fd%2F0TyIwgmVkt%2Fvehicle-counting-tai%3ForgId%3D1%26refresh%3D5s',
      },
      {
        title: 'Trạm Suối Giữa',
        value:
          'https://za.zalo.me/v3/verifyv2/pc?token=OcBrmjjsM05a3Vp3snvVPsSA-RBR6K9nRXFaim&continue=http%3A%2F%2F128.199.124.231%3A8082%2Fd%2F0TyIwgmVkt%2Fvehicle-counting-tai%3ForgId%3D1%26refresh%3D5s',
      },
    ],
    name: 'gravana',
    color: 'info',
  },
  {
    title: 'Trạm Thu Phí',
    type_icon: 'icon',
    icon: 'ti ti-home',
    button: 'dropdown',
    children: [],
    action: 'changeValue',
    name: 'tollbooth',
    color: 'primary',
  },
  {
    title: 'Làn Xe',
    type_icon: 'icon',
    icon: 'ti ti-direction-alt',
    button: 'dropdown',
    children: [],
    action: 'changeValue',
    name: 'lane',
    color: 'primary',
  },
  {
    title: 'Ngày',
    type: 'date',
    button: 'input',
    color: 'outline-primary',
    icon: 'fa fa-calendar',
    name: 'date',
  },
  {
    title: 'Tìm',
    icon: 'search',
    button: 'button',
    action: 'getAllVideo',
    color: 'secondary',
    name: 'search',
  },
];
export const Report_Buttons: BUTTON[] = [
  {
    title: 'Trạm Thu Phí',
    type_icon: 'icon',
    icon: 'ti ti-home',
    button: 'dropdown',
    children: [],
    action: 'changeValue',
    name: 'tollbooth',
    color: 'primary',
  },
  {
    title: 'Ngày',
    icon: 'fa fa-calendar',
    type: 'date',
    button: 'input',
    name: 'date',
    color: 'outline-primary',
  },
  {
    title: 'Tìm',
    icon: 'search',
    button: 'button',
    action: 'getAllVideo',
    name: 'search',
    color: 'secondary',
  },
];
