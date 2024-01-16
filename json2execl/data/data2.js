module.exports = {
    index: {
        nav: {
            home: '安全抽查',
            rule: '安全抽查配置'
        },
        management: '视频抽查',
        search: {
            placeholder: {
                orgId: '机构',
                plateNumber: '车辆',
                status: '状态',
                pos: '请选择',
                all: '全部'
            }
        },
        ruleSettings: '规则设置',
        total: '总共',
        table: {
            licensePlate: '车辆',
            organization: '车辆机构',
            clockDriver: '打卡司机',
            startTime: '开始时间',
            endTime: '结束时间',
            videoStartPosition: '视频开始位置',
            state: '视频状态',
            toBeExtracted: '待提取',
            extracting: '提取中',
            extractionCompleted: '提取完成',
            failedToExtract: '提取失败',
            extractionProgress: '提取进度',
            spotCheckRuleDetail: '抽查规则详情',
            ruleDetail: {
                cameraRange: '摄像头范围',
                sportCheckTime: '抽查时间',
                recordingInterval: '录制间隔'
            },
            updateTime: '更新时间',
            operation: '操作',
            operationBtn: {
                check: '查看',
                download: '下载',
                ReExtract: '重新提取',
                edit: '修改',
                del: '删除'
            },
            operationMessage: {
                ConfirmOperation: '警告',
                deleteConfirmContent: '删除后无法自动视频抽查，请确定该操作？',
                operateSuccess: '操作成功',
                ruleTipsOperation: '规则匹配提示'
            }
        },
        download: {
            operationMessage: {
                ConfirmOperation: '视频资料下载',
                ConfirmPlaceholder: '请选择下载内容'
            }
        }
    },
    rule: {
        navBtn: '设置规则',
        nav: {
            vehicleConfiguration: '车辆配置',
            timeConfiguration: '时间配置'
        },
        Item: {
            ruleScope: {
                title: '车辆范围',
                placeholder: '请选择'
            },
            bTorg: '所属机构',
            cameraChannel: '摄像头频道',
            timeInterval: {
                title: '时间区间',
                byDay: '按日',
                byWeek: '按周',
                byMonth: '按月',
                monthDesc: '每月对应日期',
                add: '新增时间段',
                period: '时间段',
                del: '删除'
            },
            formRules: {
                minInterError: '最小连续间隔不能为空',
                cronError: '请选择时间区间',
                orgError: '请选择机构车辆'
            },
            videoLength: '视频长度',
            minute: '分钟',
            MinimumInterval: '已选时间段最小连续录制间隔',
            tips: '提示：每台车每个月视频限制240分钟，超出将无法保存配置。',
            errorTip: '错误：车辆时间配置已超过240分钟，请重新配置规则'
        },
        operationMessage: {
            ConfirmOperation: '规则生成结果',
            ConfirmContent: '点击确定，将会只保留生成成功的车辆规则配置',
            ConfirmNotSuccess: '暂无成功车辆，请重新配置抽查条件。',
            noSuccessData: '暂无成功车辆',
            successTitle: '生成成功车辆',
            failTitle: '生成失败车辆',
            openAll: '展开全部',
            closeAll: '收起全部'
        },
        weekend: {
            monday: '周一',
            tuesday: '周二',
            wednesday: '周三',
            thursday: '周四',
            friday: '周五',
            saturday: '周六',
            sunday: '周天'
        }
    }
};
