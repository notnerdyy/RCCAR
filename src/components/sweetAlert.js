import Swal from 'sweetalert2'

// 基本的成功通知 Toast
export const successToast = (message) => {
  return Swal.fire({
    toast: true,
    position: 'top-end',
    icon: 'success',
    title: message,
    showConfirmButton: false,
    timer: 2000,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.addEventListener('mouseenter', Swal.stopTimer)
      toast.addEventListener('mouseleave', Swal.resumeTimer)
    }
  })
}

// 加入購物車成功通知
export const addToCartSuccess = (productName, quantity = 1) => {
  const message = quantity > 1 
    ? `已將 ${quantity} 個 ${productName} 加入購物車` 
    : `已將 ${productName} 加入購物車`
  
  return successToast(message)
}

// 詢問是否前往購物車
export const askGoToCart = (productName, quantity = 1) => {
  const message = quantity > 1 
    ? `已將 ${quantity} 個 ${productName} 加入購物車` 
    : `已將 ${productName} 加入購物車`
  
  return Swal.fire({
    title: '已加入購物車',
    text: message,
    icon: 'success',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#64748b',
    confirmButtonText: '前往購物車',
    cancelButtonText: '繼續購物'
  })
}

// 錯誤通知
export const errorAlert = (title, message) => {
  return Swal.fire({
    icon: 'error',
    title: title || '發生錯誤',
    text: message,
    confirmButtonColor: '#3085d6'
  })
}

// 確認操作
export const confirmAction = (title, text, confirmText = '確認', cancelText = '取消') => {
  return Swal.fire({
    title,
    text,
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#d33',
    cancelButtonColor: '#3085d6',
    confirmButtonText: confirmText,
    cancelButtonText: cancelText
  })
}

// 載入中
export const loadingAlert = (title = '處理中...') => {
  return Swal.fire({
    title,
    allowOutsideClick: false,
    didOpen: () => {
      Swal.showLoading()
    }
  })
}

// 關閉當前 alert
export const closeAlert = () => {
  Swal.close()
}

// 自定義 Toast mixin
export const Toast = Swal.mixin({
  toast: true,
  position: 'top-end',
  showConfirmButton: false,
  timer: 2000,
  timerProgressBar: true,
  didOpen: (toast) => {
    toast.addEventListener('mouseenter', Swal.stopTimer)
    toast.addEventListener('mouseleave', Swal.resumeTimer)
  }
})

// 導出 Swal 本身，以便在需要時使用其他功能
export default Swal