![스크린샷 2024-06-08 105355](https://github.com/JOY-org/.github/assets/159886707/9ebefbf9-5b93-4b31-9768-f01833e3f4af)
# CHALLEN.GG - VER.2

<div >
   <img src="https://github.com/user-attachments/assets/99ad4120-6f3d-445e-8bf2-74508dd6ddfc" width="200" height="350" style="object-fit: cover;" />
</div>

## 1. 챌린지지 버전 2란?

팀 프로젝트 당시 개발한 건강 관리 어플리케이션, **챌린지지**는 기획한 모든 기능을 완료하지 못하고마무리되었습니다. 이 아쉬움을 해결하기 위해 개인 프로젝트로 전환하여 부족한 부분을 보완하고 재구성하였습니다.

[challen.gg - ver 1 프로젝트 주소](https://github.com/JOY-org/CHALLEN.GG_FE.git)

## 2. 변경 사항

- 데스크탑 전용 UI에서 반응형 UI로 변경
- 홈페이지, 마이페이지, 커뮤니티 페이지만 유지하고 쇼핑몰 페이지와 포인트 제도를 제거

## 3. 변경 이유

- **건강 관리 애플리케이션**의 특성상 데스크탑 사용보다 스마트폰 사용자가 더 많기 때문에, 반응형 UI는 필수적이라고 생각했습니다.
- 건강 관리에 중점을 두어야 하는 애플리케이션에서 쇼핑몰 기능은 목적에 부합하지 않으며, 사용자들에게 앱의 정체성에 혼란을 줄 수 있다고 판단했습니다.

## 4. 사용 기술

- HTML
- CSS 모듈
- JavaScript
- React

## 5. 트러블 슈팅
### 💜팀 프로젝트

💛**이미지 필터링 문제**

- **문제**: 이미지를 필터링하는 과정이 없어 사용자 확인 없이 문제가 있는 이미지가 등록될 수 있음.
- **해결**: 중간에 확인 버튼을 추가하고, `FileReader()`를 활용하여 미리 보기 기능을 구현해 사용자 불편을 줄임.
- **알게 된 점**: 사용자 편의를 고려한 UI/UX 개선은 필수적이며, 즉각적인 피드백 제공이 중요함.

💛**콜 백 헬 문제**

- **문제**: 비동기 처리를 위한 콜백 사용으로 코드의 복잡도가 높아지고 가독성이 떨어짐.
- **해결**: `async/await`를 도입하여 비동기 코드를 구조화하고, REST API를 중앙에서 관리하여 코드의 가독성과 유지보수성을 향상.
- **알게 된 점**: 비동기 처리 시 가독성을 위해 `async/await`을 활용하는 것이 효과적이며, API 관리의 중앙 집중화가 코드 효율성을 높임.

💛**Prop Drilling 문제**

- **문제**: 챌린지 관리 페이지에서 Prop Drilling이 4번 발생하여 코드가 복잡해짐.
- **해결**: `Context API`를 사용해 전역 상태로 데이터를 관리하며 Prop Drilling 문제 해결.
- **알게 된 점**: 전역 상태 관리 도구를 활용하여 불필요한 데이터 전달을 줄임으로써 코드의 단순화와 유지보수성이 개선됨.

---

### 💜개인 프로젝트

💛**공통 CSS 관리 문제**

- **문제**: 개별 컴포넌트들이 페이지별로 철저히 분리되어 공통 CSS 파일을 생성하고 스타일을 관리하기 어려움.
- **해결**: 모든 페이지 최상단에 공통 CSS 코드를 작성하여 통일된 레이아웃 구축.
- **효과**:
    - **코드 일관성**: 공통 CSS 작성으로 코드 일관성과 유지보수성이 크게 향상됨.
    - **디자인 통일성**: 디자인 가이드라인을 준수하여 통일된 UI/UX를 구현하고, 각 페이지 간의 일관성을 확보.
    - **성능 최적화**: 기본 스타일을 설정함으로써 중복 코드 제거 및 리소스 낭비 감소, 성능 최적화에 기여.
- **알게 된 점**: 공통 스타일을 최상단 CSS로 관리함으로써 코드 간결성과 디자인 일관성을 유지하는 방법을 체득함.

💛**쇼핑몰 페이지와 핵심 기능 벗어남**

- **문제**: 쇼핑몰 페이지가 앱의 목적과 맞지 않고, 앱의 핵심 기능에서 벗어난다는 판단.
- **해결**: 앱의 건강 관리 기능에 집중하기 위해 쇼핑몰 페이지와 관련 파일을 삭제하고, 핵심 페이지인 홈페이지, 마이 페이지, 커뮤니티 페이지에 집중.
- **알게 된 점**: 프로젝트의 본질과 일치하지 않는 기능은 과감히 삭제하는 것이 전체 UX를 개선하고 앱의 정체성을 명확히 할 수 있음.

💛**모바일 UI 구현 시 레이아웃 문제**

- **문제**: 모바일 레이아웃으로 전환할 때 화면 비율에 따라 요소의 크기나 위치가 불균형해지는 문제 발생.
- **해결**: 반응형 디자인을 위한 미디어 쿼리를 활용하여 각 디바이스에 맞게 요소 크기를 조정하고, 레이아웃이 안정적으로 나타나도록 `flex`와 `grid` 레이아웃을 혼합하여 사용.
- **알게 된 점**: 모바일 환경에 맞춘 레이아웃 설정이 UI 통일성에 중요한 요소이며, 다양한 디바이스별 테스트가 필수임을 인식하게 됨.

## 6. 느낀 점
웹에서 앱으로 전환하는 작업은 도전적이었지만, 웹과 앱 구조에 대한 깊은 이해를 얻는 데 큰 도움이 되었습니다. 미디어 쿼리를 활용하여 화면 너비에 따라 레이아웃을 조정하는 과정에서 반응형 디자인의 기본을 익혔으며, 다양한 반응형 단계에서 발생하는 레이아웃 문제를 해결하면서 `position`에 대한 이해도를 높일 수 있었습니다. 특히, 웹보다 작은 화면에서 필수적인 정보만을 고려하여 앱 UI를 설계하는 경험이 유익했습니다.

## 7. 배운 점
01. 반응형 CSS에 대한 이해: 반응형 디자인 원칙을 기반으로 CSS를 통해 다양한 디바이스에서 유연하게 레이아웃을 조정하는 방법을 익혔습니다. 특히, 모바일 중심의 UX를 고려해 화면 크기에 따라 중요도 높은 정보를 우선적으로 배치하는 법을 학습했습니다.

02. 반응형 포지션 이해: 화면 크기와 비율에 따라 position, flex, grid 등의 속성을 적절히 조합하여 요소를 배치하는 방법을 깊이 이해하게 되었습니다. 작은 화면에서는 absolute와 relative 속성을 통해 공간을 효율적으로 활용하고, 중요한 정보가 자연스럽게 배치되도록 설계했습니다. 이를 통해 다양한 디바이스에서 일관된 사용자 경험을 제공하는 방법을 배웠습니다.

03. 미디어 쿼리와 CSS 구조화: 미디어 쿼리를 단계별로 적용하면서 각 디바이스에 맞는 최적의 레이아웃을 구성하고, 코드 중복을 최소화하는 방식으로 CSS를 구조화하는 중요성을 깨달았습니다.

04. 레이아웃의 유연성과 성능 최적화: 반응형 레이아웃 구현에서 필수적인 요소만 표시하도록 설계해 성능을 최적화하는 법을 배웠으며, 이를 통해 사용자 친화적인 반응형 디자인을 구축하는 경험을 쌓을 수 있었습니다.









