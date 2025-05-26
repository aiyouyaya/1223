// 班级学生名单 - 替换为实际名单
const students = [
    "白林涵", "陈昊妍", "董萌萌", "范昱涵", "高一涵",
    "郭超", "侯宪坤", "黄博", "姜子超", "鞠忠宏",
    "李茂川", "李永乐", "李云", "林佳祺", "吕君蕊",
	"秦金龙", "秦士淞", "孙家豪", "孙若冰", "孙义凯",
	"孙子凌", "索京奥", "王朝闻", "王俊豪", "王梦月",
	"王文昌", "王运旺", "王祉盛", "卫学振", "武启航",
	"徐浩文", "许广洋", "许源赫", "薛景文", "张丁文",
	"张静", "张俊飞", "张艳可", "张云翔", "张志恒",
	"赵宝华","赵家豪", "周政涟", "邹谦慧"
];

// 获取DOM元素
const displayArea = document.getElementById('displayArea');
const startBtn = document.getElementById('startBtn');
const stopBtn = document.getElementById('stopBtn');
const studentList = document.getElementById('studentList');
const studentCount = document.getElementById('studentCount');

// 初始化变量
let timer = null;
let isRunning = false;
let currentIndex = 0;
let speed = 100; // 初始滚动速度(ms)
let slowDownInterval = null; // 减速定时器

// 初始化学生列表
function initStudentList() {
    studentList.innerHTML = '';
    students.forEach((student, index) => {
        const li = document.createElement('li');
        li.className ='student-item';
        li.textContent = student;
        li.setAttribute('data-index', index);
        studentList.appendChild(li);
    });
    studentCount.textContent = `${students.length}人`;
}

// 随机选择学生
function randomSelect() {
    currentIndex = Math.floor(Math.random() * students.length);
    displayArea.textContent = students[currentIndex];

    // 移除之前的高亮
    const highlighted = document.querySelector('.student-item.highlight');
    if (highlighted) {
        highlighted.classList.remove('highlight');
    }

    // 添加新的高亮
    const allStudents = studentList.querySelectorAll('.student-item');
    allStudents[currentIndex].classList.add('highlight');

    // 滚动到可见区域
    allStudents[currentIndex].scrollIntoView({
        behavior:'smooth',
        block: 'nearest'
    });
}

// 开始随机选择
function startRandom() {
    if (isRunning) return;

    isRunning = true;
    startBtn.disabled = true;
    stopBtn.disabled = false;
    displayArea.classList.add('rolling');

    // 清除之前的定时器
    if (timer) clearInterval(timer);
    if (slowDownInterval) clearInterval(slowDownInterval);

    // 初始快速滚动
    speed = 100;
    timer = setInterval(randomSelect, speed);

    // 逐渐减慢速度
    slowDownInterval = setInterval(() => {
        if (speed < 300) {
            speed += 20;
            clearInterval(timer);
            timer = setInterval(randomSelect, speed);
        } else {
            clearInterval(slowDownInterval);
        }
    }, 500);
}

// 停止随机选择
function stopRandom() {
    if (!isRunning) return;

    // 清除所有定时器
    clearInterval(timer);
    clearInterval(slowDownInterval);

    isRunning = false;
    startBtn.disabled = false;
    stopBtn.disabled = true;
    displayArea.classList.remove('rolling');

    // 确保最后显示的学生被选中
    randomSelect();

    // 显示选中动画
    displayArea.style.animation ='selected-pulse 0.5s 3';
    setTimeout(() => {
        displayArea.style.animation = '';
    }, 1500);
}

// 事件监听
startBtn.addEventListener('click', startRandom);
stopBtn.addEventListener('click', stopRandom);

// 初始化
initStudentList();