# 리액트 요약 정리. 

## 정의 
- 자바스크립트 라이브러리 for UI. (not framework)
- mv* 패턴에서 V에 해당하는 부분!

## 특징
- 오로지 자바스크립트 기반이라 추가 기술은 필요 없음. 
    - 에초에 준비물이 node.js, npm, yarn 정도고
    - 언어적 배경은 JSX 정도가 필요함. 
        - jsx는 자바스크립트에서 선언하는 HTML 이라고 보면 됨. class 대신 className 사용한다던가 하는 차이는 있음. 
- UI를 그룹별로 쪼개서 관리, 작업이 가능함.(헤더, 바디, nav 등)
- 단방향 데이터 흐름.(DATA -> UI) 
    - 데이터 흐름이 간단해서 파악하기 쉬움.  

## 필요 도구 
-모듈 번들리 : _ create react app _
    - 만들어진 리액트 소스를 *표준파일(js, html,css, 이미지)로 만들어 줘야함.
        - 표준파일 : 별다른 걸 쓰지 않은 순수 html페이지 
    - 이런 용도로 많이 쓰는건 웹팩. 그러나 리액트는 리액트 전용 모듈번들러가 있음. 
        ``` 
            npm install -g create-react-app  
            create-react-app {appName}  
            yarn/npm start 
        ```

## 리액트가 표준파일로 변하는 로직

기본구조(create-react-app생성시)기준으로 
- 일단 외부 접근은 public 폴더의 html임.(표준웹코드)
- public의 html파일은 src의 같은 이름인 js와 css를 가지고 만들어짐. 
    - 즉 접근시 보여주는 페이지는 public html,css + src js,css 를 변환 한 새로운 html임.
    - src폴더의 js 는 public 폴더의 html과 매칭됨
- 이걸 변환해 주는게 reactDOM. 
    - 리액트소스를 웹소스로 바꿔주는 데이터모델.
    - reactDOM의 render() [doccument](https://reactjs.org/docs/react-dom.html#render)
        - 파라메터상 앞의 선언된 내용(src의 컴포넌트)를 html파일의 해당 검포넌트에 넣어준다. 
        - 통상 앞은 impoert해서, 뒤는 getElementById로 만들어준다. 
    - 참고로 리액트네이티브는 리액트를 모바일로 바꿔주는 데이터 모델.
- html이 없는 js파일들은 보면 컴포넌트 선언을 위해 만드는 경우
    - app.js가 가장 기본적인 형태. 
        - import React, { Component } from 'react';
        - 내부에 JSX로 선언 해서 사용한다. 
        ```
            class App extends Component {
              render() {
                return (
               //여기에 JSX로 사용하면 된다. 
                );
              }
            }
        ```
        - 컴포넌트 안에 새로운 컴포넌트도 태깅으로 선언 가능. 


## 데이터 관리 
- props 
    - 메인 컴포넌트에만 데이터를 넣고 props로 하위 컴포넌트 들에 정보를 전달. 표시함. 
    - 따라서 데이터의 변동이 없는 const데이터가 적합할 것으로 보임. 
    - 데이터는 ml태그(<>) 안에서 <code> propsName = "value"</code>로 전달.
    - 컴포넌트에서는 <code> {this.props.propsName} </code>으로 사용.
    - 별도로 defaultProps도 선언 가능
        - <code>className.defaultProps = { propName: value }</code>
    - **고정 데이터라면 array.map을 잘 활용하자.(리액트는 array에 키를 입력하도록 권고함.)
    - 타입 지정은 ``` prop-types ``` 모듈을 이용한다. (문자, 숫자, 불리언 및 필수 체크 가능.)
- state
    - object in react
    - state가 변경될때마다 render가 발생함. 
    - component에 obj 타입으로 기록하며 ``` this.state.stateName ``` 처럼 접근 
    - 직접 접근은 불허함. ``` this.SetState()```로 수정.
        - update가 아니라 set이기 떄문에 기존 리스트는 유지할 필요가 있음.  ``` ...this.state.stateName, ```(전개연산자 적극 활용)

## (컴포넌트)라이프 사이클
-최초 render시(mounting)
    1. componentWillMount()
    2. render()
    3. componentDidMount()
- update(prop 변경)
    1. componentWillReceiveProps()
    2. shouldComponentUpdate() -> prop 비교후(old/new) 업데이트해야하면 3으로 진행.
    3. componentWillUpdate()
    4. render()
    5. componentDidUpdate()

## smart component Vs Dumb Component
- state의 유무를 말함.
- Dumb Components 
    - state가 없음. 
    - 굳이 class부터 작성하지 않고 functional로 작성해도 무관함. 

## Ajax(Asynchronous JavaScript and XML) on React
- 어짜피 json에다 씀. XML 무시(...)
- Fetch request로 간단하게 쓸 수 있음. (es6 기준 최신 js 지원.)
- fetch의 결과는 promise로 전달됨.

## Promises
- ES6에서 비동기 프로그래밍을 위해 추가된 자바스크립트 컨셉 
- 비동기 결과에 대한 성공/실패에 대한 시나리오를 관리하기 쉬움.(fetch.then().catch() 두 함수로.)

## async await in React
- 프로미스로 가져온 데이터를 쓸수있게 바꾸는것.(동기와 비동기의 싱크)
- async로 선언된 함수 내의 await 키워드는 해당 비동기 작업이 완료될때까지 기다리는 역할임.