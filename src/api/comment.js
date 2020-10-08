import request from '../utils/request.js'
//传data
export function getComment(data) {
  return request ({
    url:'get_info',
    data
  })
}
