<template>
  <div class="page">
    <div class="navigation">
      <el-checkbox-group v-model="checkList">
        <el-checkbox label="A" @change="camera">摄像系统</el-checkbox>
        <el-checkbox label="B" @change="fireEmergency">消防应急系统</el-checkbox>
        <el-checkbox label="C" @change="safetyEvacuation">安全疏散点</el-checkbox>
        <el-checkbox label="D" @change="hazards">危险源</el-checkbox>
        <el-checkbox label="E" @change="chemicals">危险源化学品</el-checkbox>
        <el-checkbox label="F" @change="chemicalProcess">危险化学工艺</el-checkbox>
        <el-checkbox label="G" @change="fireHydrant">消防栓</el-checkbox>
        <el-checkbox label="H" @change="blisters">水泡</el-checkbox>
        <el-checkbox label="I" @change="bubbleStation">泡沫站</el-checkbox>
        <el-checkbox label="L" @change="firePipes">消防管道</el-checkbox>
      </el-checkbox-group>
    </div>
    <div class="floorPlan">
      <div class="floorPlan_page">
        <!-- 摄像头 -->
        <div v-if="checkbox.camera">
          <img
            class="camera1"
            src="../../assets/pro img/img1.png"
            alt="摄像头1"
          />
          <img
            class="camera2"
            src="../../assets/pro img/img1.png"
            alt="摄像头2"
          />
          <img
            class="camera3"
            src="../../assets/pro img/img1.png"
            alt="摄像头3"
          />
          <img
            class="camera4"
            src="../../assets/pro img/img1.png"
            alt="摄像头4"
          />
        </div>
        <!-- 消防应急系统 -->
        <div v-if="checkbox.fireEmergency">
          <img
            class="fireEmergency1"
            src="../../assets/pro img/img2.png"
            alt="消防应急1"
          />
          <img
            class="fireEmergency2"
            src="../../assets/pro img/img2.png"
            alt="消防应急2"
          />
          <img
            class="fireEmergency3"
            src="../../assets/pro img/img2.png"
            alt="消防应急3"
          />
        </div>
        <!-- 安全疏散点 -->
        <div v-if="checkbox.safetyEvacuation">
          <img
            class="safetyEvacuation1"
            src="../../assets/pro img/img3.png"
            alt="安全疏散点1"
          />
          <img
            class="safetyEvacuation2"
            src="../../assets/pro img/img3.png"
            alt="安全疏散点2"
          />
          <img
            class="safetyEvacuation3"
            src="../../assets/pro img/img3.png"
            alt="安全疏散点3"
          />
        </div>
        <!-- 危险源 -->
        <div v-if="checkbox.hazards">
          <img
            class="hazards1"
            src="../../assets/pro img/img4.png"
            alt="危险源1"
          />
          <img
            class="hazards2"
            src="../../assets/pro img/img4.png"
            alt="危险源2"
          />
        </div>
        <!-- 危险源化学品 -->
        <div v-if="checkbox.chemicals">
          <img
            class="chemicals1"
            src="../../assets/pro img/img5.png"
            alt="危险源化学品1"
          />
          <img
            class="chemicals2"
            src="../../assets/pro img/img5.png"
            alt="危险源化学品2"
          />
          <img
            class="chemicals3"
            src="../../assets/pro img/img5.png"
            alt="危险源化学品3"
          />
        </div>
        <!-- 危险化学工艺 -->
        <div v-if="checkbox.chemicalProcess">
          <img
            class="chemicalProcess1"
            src="../../assets/pro img/img5.png"
            alt="危险化学工艺1"
          />
          <img
            class="chemicalProcess2"
            src="../../assets/pro img/img5.png"
            alt="危险化学工艺2"
          />
        </div>
        <!-- 消防栓 -->
        <div v-if="checkbox.fireHydrant">
          <img
            class="fireHydrant1"
            src="../../assets/pro img/img7.png"
            alt="消防栓1"
          />
          <img
            class="fireHydrant2"
            src="../../assets/pro img/img7.png"
            alt="消防栓2"
          />
          <img
            class="fireHydrant3"
            src="../../assets/pro img/img7.png"
            alt="消防栓3"
          />
          <img
            class="fireHydrant4"
            src="../../assets/pro img/img7.png"
            alt="消防栓4"
          />
        </div>
        <!-- 水泡 -->
        <div v-if="checkbox.blisters">
          <img
            class="blisters1"
            src="../../assets/pro img/img8.png"
            alt="水泡1"
          />
          <img
            class="blisters2"
            src="../../assets/pro img/img8.png"
            alt="水泡2"
          />
        </div>
        <!-- 泡沫站 -->
        <div v-if="checkbox.bubbleStation">
          <img
            class="bubbleStation1"
            src="../../assets/pro img/img9.png"
            alt="泡沫站1"
          />
          <img
            class="bubbleStation2"
            src="../../assets/pro img/img9.png"
            alt="泡沫站2"
          />
        </div>
        <!-- 消防管道 -->
        <div v-if="checkbox.firePipes">消防管道</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      checkList: [],
      checkbox: {
        camera: false,
      },
    };
  },
  methods: {
    camera(e) {
      if (e == true) {
        this.checkbox.camera = true;
      } else {
        this.checkbox.camera = false;
      }
    },
    safetyEvacuation(e) {
      if (e == true) {
        this.checkbox.safetyEvacuation = true;
      } else {
        this.checkbox.safetyEvacuation = false;
      }
    },
    fireEmergency(e) {
      if (e == true) {
        this.checkbox.fireEmergency = true;
      } else {
        this.checkbox.fireEmergency = false;
      }
    },
    hazards(e) {
      if (e == true) {
        this.checkbox.hazards = true;
      } else {
        this.checkbox.hazards = false;
      }
    },
    chemicals(e) {
      if (e == true) {
        this.checkbox.chemicals = true;
      } else {
        this.checkbox.chemicals = false;
      }
    },
    chemicalProcess(e) {
      if (e == true) {
        this.checkbox.chemicalProcess = true;
      } else {
        this.checkbox.chemicalProcess = false;
      }
    },
    fireHydrant(e) {
      if (e == true) {
        this.checkbox.fireHydrant = true;
      } else {
        this.checkbox.fireHydrant = false;
      }
    },
    blisters(e) {
      if (e == true) {
        this.checkbox.blisters = true;
      } else {
        this.checkbox.blisters = false;
      }
    },
    bubbleStation(e) {
      if (e == true) {
        this.checkbox.bubbleStation = true;
      } else {
        this.checkbox.bubbleStation = false;
      }
    },
    firePipes(e) {
      if (e == true) {
        this.checkbox.firePipes = true;
      } else {
        this.checkbox.firePipes = false;
      }
    },
  },
};
</script>
<style scoped>
.page {
  width: 100%;
  height: 800px;
}
.navigation {
  text-align: center;
}
.floorPlan {
  margin-top: 10px;
  width: 100%;
  height: 100%;
  background: rgba(244, 246, 248, 0.8);
  overflow: hidden;
}
.floorPlan_page {
  width: 100%;
  height: 960px;
  background: url("../../assets/pro img/runxia.png") no-repeat center center
    fixed;
  -moz-background-size: 70% 70%;
  background-size: 85% 75%;
}
/* 摄像头 */
.camera1 {
  position: fixed;
  top: 41%;
  left: 15%;
}
.camera2 {
  position: fixed;
  top: 55%;
  left: 41%;
}
.camera3 {
  position: fixed;
  top: 78%;
  left: 58%;
}
.camera4 {
  position: fixed;
  top: 62%;
  left: 82%;
}
/* 安全疏散点 */
.safetyEvacuation1 {
  position: fixed;
  top: 70%;
  left: 38%;
}
.safetyEvacuation2 {
  position: fixed;
  top: 46%;
  left: 45%;
}
.safetyEvacuation3 {
  position: fixed;
  top: 79%;
  left: 60%;
}
/* 危险源 */
.hazards1 {
  position: fixed;
  top: 61%;
  left: 70%;
}
.hazards2 {
  position: fixed;
  top: 70%;
  left: 33%;
}
/* 危险化学品 */
.chemicals1 {
  position: fixed;
  top: 57%;
  left: 33%;
}
.chemicals2 {
  position: fixed;
  top: 53%;
  left: 55%;
}
.chemicals3 {
  position: fixed;
  top: 38%;
  left: 80%;
}
/* 化学工艺品 */
.chemicalProcess1 {
  position: fixed;
  top: 38%;
  left: 20%;
}
.chemicalProcess2 {
  position: fixed;
  top: 38%;
  left: 55%;
}
/* 消防栓 */
.fireHydrant1 {
  position: fixed;
  top: 35%;
  left: 18%;
}
.fireHydrant2 {
  position: fixed;
  top: 23%;
  left: 75%;
}
.fireHydrant3 {
  position: fixed;
  top: 60%;
  left: 75%;
}
.fireHydrant4 {
  position: fixed;
  top: 73%;
  left: 75%;
}
/* 水泡 */
.blisters1 {
  position: fixed;
  top: 50%;
  left: 55%;
}
.blisters2 {
  position: fixed;
  top: 73%;
  left: 62%;
}
/* 泡沫站 */
.bubbleStation1 {
  position: fixed;
  top: 43%;
  left: 15%;
}
.bubbleStation2 {
  position: fixed;
  top: 45%;
  left: 81%;
}
/* 消防应急 */
.fireEmergency1 {
  position: fixed;
  top: 45%;
  left: 50%;
}
.fireEmergency2 {
  position: fixed;
  top: 22%;
  left: 70%;
}
.fireEmergency3 {
  position: fixed;
  top: 79%;
  left: 60%;
}
</style>