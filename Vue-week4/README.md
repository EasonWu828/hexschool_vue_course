# 第四堂：Vue 元件
## 學習提醒

學的時候好像會，真的要自己做卻不知道如何著手
- 看範例作品都會寫，蓋起來就不會
- 老師直播時都懂，但要自己運用就卡卡的
- 寫完作業好像失憶一般，再寫一次也不一定有把握

兩個解決方式：https://www.facebook.com/groups/110635703123103/permalink/702325553954112/
- 透過筆記
- 透過拆解：
![](https://i.imgur.com/pggZigI.png)



## 本週課綱

* 建立元件
* 元件資料傳遞
* 生命週期


## 建立元件
**為什麼要使用元件？**
常見拆分原因：
* 程式碼太長
* 部分元件需要多次運用
* 邏輯拆分，不同的功能使用獨立的元件進行運作
* Vue Router 時，每個元件都是獨立頁面
* 元件內外層說明
    * 元件註冊 -> 兩種方式
        * 全域註冊
        * 區域註冊 -> import 的手法
    * 模板運用
        * Template Literial
        * x-template type="text/x-template"
        * Vue Cli Vue file （概念與 x-template 相同）
    * 元件資料建構方式
        * function return
    * HTML 上的運用方式
        * 標籤
        * v-is 屬性（動態屬性）
    * 常見錯誤：
        * v-for 一定要搭配 key
        * 元件命名規則：
        *  [https://vue3js.cn/docs/zh/guide/component-registration.html#组件注册](https://vue3js.cn/docs/zh/guide/component-registration.html#%E7%BB%84%E4%BB%B6%E6%B3%A8%E5%86%8C) 


## 元件資料傳遞
為什麼要做資料傳遞
	- 實作必要知識：最終作業範例 ： [https://works.hexschool.io/#/](https://works.hexschool.io/#/) 
	- 面試常見考題
        
兩大體系：元件間傳遞、全域傳遞（下週介紹）
* HTML 是兩者串接的橋樑
* 上到下：props
	* 口訣：前面是名稱，後面是值 注意：單向數據流、HTML 屬性一律是小寫、該資料如果不存在，則可能會導致內層出錯
* 下到上：$emit（托球）
	* 口訣：emit 推，外 methods 接收
	* 口訣：HTML 前內，後外

## 生命週期
元件生命週期
https://vue3js.cn/docs/zh/guide/instance.html#%E7%94%9F%E5%91%BD%E5%91%A8%E6%9C%9F%E5%9B%BE%E7%A4%BA

* 生命週期範例
* 生命週期的問題
	* 搭配 v-if 的問題 <keep-alive>
	* v-if, v-show
	* jQuery 為什麼抓不到元素
	* created vs mounted 的資料處理差異


### 第四週任務
*  [第四週主線任務：元件化](https://rpg.hexschool.com/training/18/task?type=detail&id=182) 


### 課後建議學習章節
*  [元件章節影片](https://courses.hexschool.com/courses/vue-2021/lectures/31863178) 
推薦觀看章節：Methods、Watch、Computed 運算基礎運用
