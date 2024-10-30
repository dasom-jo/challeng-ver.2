![스크린샷 2024-06-08 105355](https://github.com/JOY-org/.github/assets/159886707/9ebefbf9-5b93-4b31-9768-f01833e3f4af)
# CHALLEN.GG - VER.2

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
**01**

**문제**: 각 페이지별로 개별 컴포넌트들이 철저히 분리된 구조로 개발되어, 공통 CSS 파일을 생성해 스타일을 관리하기 어려웠습니다. 또한 페이지별로 성격이 다른 레이아웃을 사용해 레이아웃의 통일성이 부족해 보였습니다.

**해결**: 모든 페이지 최상단에 동일한 CSS 코드를 작성하여 일관된 레이아웃을 구축했습니다. 

**효과**:

01.개별 CSS 모듈 사용으로 공통 스타일을 분리하는 데 한계가 있었으나, 최상단 CSS로 통일하면서 코드 일관성과 유지보수성 측면에서 장점을 얻을 수 있었습니다.

02.공통 CSS 파일 없이도 전체적으로 통일된 UI/UX를 구현하여 디자인 일관성을 유지할 수 있었습니다. 이는 디자인 가이드라인을 엄격히 준수하고, 간결한 코드 작성을 통한 통일성 확보라는 의도적인 선택임을 강조할 수 있습니다.

03.개별 컴포넌트에 스타일을 적용하는 대신 최상단 CSS를 통해 기본 스타일을 설정하여, 불필요한 중복 코드와 리소스 낭비를 줄일 수 있었고, 성능 최적화에도 기여했습니다.

**02**

**문제**: 쇼핑몰 페이지의 완성도가 떨어졌고, 앱의 목적과 핵심 기능에서 벗어난다고 생각되었습니다.

**해결**: 건강 관리 애플리케이션의 본래 목적에 집중하기 위해 쇼핑몰 페이지와 관련 파일을 과감히 삭제하고, 홈페이지, 마이페이지, 커뮤니티 페이지에만 집중하여 사용자 경험과 앱의 정체성을 강화했습니다.

## 6. 느낀 점
웹에서 앱으로 전환하는 작업은 도전적이었지만, 웹과 앱 구조에 대한 깊은 이해를 얻는 데 큰 도움이 되었습니다. 미디어 쿼리를 활용하여 화면 너비에 따라 레이아웃을 조정하는 과정에서 반응형 디자인의 기본을 익혔으며, 다양한 반응형 단계에서 발생하는 레이아웃 문제를 해결하면서 `position`에 대한 이해도를 높일 수 있었습니다. 특히, 웹보다 작은 화면에서 필수적인 정보만을 고려하여 앱 UI를 설계하는 경험이 유익했습니다.

## 7. 배운 점
1.반응형 CSS에 대한 이해: 반응형 디자인 원칙을 기반으로 CSS를 통해 다양한 디바이스에서 유연하게 레이아웃을 조정하는 방법을 익혔습니다. 특히, 모바일 중심의 UX를 고려해 화면 크기에 따라 중요도 높은 정보를 우선적으로 배치하는 법을 학습했습니다.

2.반응형 포지션 이해: 화면 크기와 비율에 따라 position, flex, grid 등의 속성을 적절히 조합하여 요소를 배치하는 방법을 깊이 이해하게 되었습니다. 작은 화면에서는 absolute와 relative 속성을 통해 공간을 효율적으로 활용하고, 중요한 정보가 자연스럽게 배치되도록 설계했습니다. 이를 통해 다양한 디바이스에서 일관된 사용자 경험을 제공하는 방법을 배웠습니다.

3.미디어 쿼리와 CSS 구조화: 미디어 쿼리를 단계별로 적용하면서 각 디바이스에 맞는 최적의 레이아웃을 구성하고, 코드 중복을 최소화하는 방식으로 CSS를 구조화하는 중요성을 깨달았습니다.

40레이아웃의 유연성과 성능 최적화: 반응형 레이아웃 구현에서 필수적인 요소만 표시하도록 설계해 성능을 최적화하는 법을 배웠으며, 이를 통해 사용자 친화적인 반응형 디자인을 구축하는 경험을 쌓을 수 있었습니다.

## 8. 결과물
<div >
   <img src="https://github.com/user-attachments/assets/99ad4120-6f3d-445e-8bf2-74508dd6ddfc" width="400" height="700" style="object-fit: cover;" />
</div>







