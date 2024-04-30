module.exports = {
  theme: {
    extend: {
      backgroundColor: {
        'body': '#f5f5f5', // 페이지 전체 배경색 설정
        'container': 'rgb(243, 251, 255)', // TodoList 컨테이너 배경색 설정
      },
      borderRadius: {
        'default': '10px', // TodoList 컨테이너의 border-radius 설정
        'button': '5px', // 버튼의 border-radius 설정
      },
      boxShadow: {
        'default': '0 2px 5px rgba(0, 0, 0, 0.1)', // TodoList 컨테이너의 box-shadow 설정
      },
      // 기타 필요한 스타일 설정
    },
  },
  variants: {},
  plugins: [],
}

