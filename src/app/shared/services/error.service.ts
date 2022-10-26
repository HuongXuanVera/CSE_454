import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import Swal from 'sweetalert2';

@Injectable({ providedIn: 'root' })
export class ErrorService {
  constructor(private router: Router) {}
  handleError(error: any) {
    switch (error.status) {
      case 401: {
        this.router.navigate(['error/error401']);
        return;
      }
      case 404: {
        this.router.navigate(['error/error404']);
        return;
      }
      case 403: {
        this.router.navigate(['error/error403']);
        return;
      }
      case 500: {
        this.router.navigate(['error/error500']);
        return;
      }
      default: {
        this.router.navigate(['error/error503']);
        return;
      }
    }
  }
  async getError(err: any) {
    const error = await this.checkError(err);
    Swal.fire({
      icon: 'warning',
      title: error.status,
      text: error.message,
      confirmButtonColor: '#7367f0',
    });
  }
  async checkError(err: any) {
    if (err.status === 401) {
      return {
        status: 401,
        message: 'Xin lỗi! Bạn không có quyền truy cập vào trang dữ liệu',
      };
    }
    if (err.status === 404) {
      return {
        status: 404,
        message: 'Xin lỗi, Không tìm thấy thông tin khả dụng !',
      };
    }
    if (err.status === 500 || err.status === 503) {
      return {
        status: err.status,
        message: 'Xin lỗi, kết nối VPN đang gặp sự cố !',
      };
    }
    if (err.status === 405) {
      return {
        status: err.status,
        message: 'Xin lỗi, Phương thức tìm kiếm không hợp lệ!',
      };
    } else {
      return { status: err.status, message: err.message };
    }
  }
  
}
