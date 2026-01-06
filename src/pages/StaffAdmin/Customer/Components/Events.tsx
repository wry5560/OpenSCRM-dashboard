import React, {useEffect, useState, useRef, useCallback} from 'react'
import styles from './index.less'
import {CustomerEvents} from "@/pages/StaffAdmin/Customer/data";
import {Dictionary} from "lodash";
import {StaffOption} from "@/pages/StaffAdmin/Components/Modals/StaffTreeSelectionModal";
import _ from 'lodash'
import dayjs from 'dayjs'
import {Spin, BackTop, Empty, Radio} from 'antd'
import {QueryCustomerEvents} from "@/pages/StaffAdmin/Customer/service";
import {useInViewport} from 'ahooks';
import {TagsFilled} from "@ant-design/icons";

interface EventsProps {
  data?: CustomerEvents.Item[];
  simpleRender?: boolean;
  staffMap: Dictionary<StaffOption>;
  extCustomerID: string;
}

const customerEventType = {
  '': '全部动态',
  'customer_action': '客户动态',
  'integral_record': '积分记录',
  'manual_event': '跟进记录',
  'moment_interaction': '朋友圈互动',
  'reminder_event': '提醒事件',
  'template_event': '模板事件',
  'update_remark': '修改信息',
}

const PAGE_SIZE = 20;

const Events: React.FC<EventsProps> = (props) => {
  const {simpleRender, data, extCustomerID} = props
  const [currentType, setCurrentType] = useState('')
  const [groupData, setGroupData] = useState({} as any)
  const [eventsList, setEventsList] = useState<CustomerEvents.Item[]>([])
  const loadMoreRef = useRef<HTMLDivElement>(null);
  const [eventListLoading, setEventListLoading] = useState(true)
  const [loadingMore, setLoadingMore] = useState(false)
  const [page, setPage] = useState(1)
  const [total, setTotal] = useState(0)
  const [noMore, setNoMore] = useState(false)
  const inViewPort = useInViewport(loadMoreRef);

  const getEvents = useCallback(async (pageNum: number, reset = false) => {
    if (reset) {
      setEventListLoading(true)
    } else {
      setLoadingMore(true)
    }

    try {
      const res = await QueryCustomerEvents({
        ext_customer_id: extCustomerID,
        ext_staff_id: localStorage.getItem('extStaffAdminID') as string,
        page_size: PAGE_SIZE,
        page: pageNum,
        event_type: currentType
      });

      const items = res?.data?.items || [];
      const totalRows = res?.data?.total_rows || 0;

      if (reset) {
        setEventsList(items.filter((elem: any) => elem !== null));
      } else {
        setEventsList(prev => [...prev, ...items].filter(elem => elem !== null));
      }

      setTotal(totalRows);
      setNoMore((reset ? items.length : eventsList.length + items.length) >= totalRows);
      setPage(pageNum);
    } finally {
      setEventListLoading(false);
      setLoadingMore(false);
    }
  }, [extCustomerID, currentType, eventsList.length]);

  const loadMore = useCallback(() => {
    if (!loadingMore && !noMore) {
      getEvents(page + 1);
    }
  }, [getEvents, loadingMore, noMore, page]);

  const reload = useCallback(() => {
    setEventsList([]);
    setPage(1);
    setNoMore(false);
    getEvents(1, true);
  }, [getEvents]);

  // 初始加载
  useEffect(() => {
    reload();
  }, [currentType, extCustomerID]);

  // 滚动加载更多
  useEffect(() => {
    if (inViewPort && !simpleRender && eventsList.length >= PAGE_SIZE && !loadingMore && !noMore) {
      loadMore()
    }
  }, [inViewPort, simpleRender, eventsList.length, loadingMore, noMore, loadMore])

  useEffect(() => {
    const temp = _.groupBy(simpleRender ? data : eventsList, (item) => {
      return dayjs(item?.created_at).format('MMM Do YYYY,dddd')
    })
    setGroupData(temp)
  }, [data, eventsList, simpleRender])

  const render = () => {
    return <div className={styles.groupByDay}>
      {
        Object.keys(groupData).map((key: any) => {
          return <>
            <div className={styles.day}>{key}</div>
            <div className={styles.events}>
              {
                groupData[key].map((item: any) => {
                  return <div className={styles.eventItem}>
                    <div className={styles.timeHeader}>
                      <TagsFilled />
                      <span>{dayjs(item?.created_at).format('h:mm')}</span>
                    </div>
                    <div className={styles.infoBottom}>
                      <div className={styles.infoBox}>
                        <span className={styles.eventType}>{customerEventType[item?.event_type]}</span>
                        <span className={styles.eventContent}>{item?.content}</span>
                      </div>
                    </div>
                  </div>
                })
              }
            </div>
          </>
        })
      }
    </div>
  }
  const onRadioChange = (e: any) => {
    setCurrentType(e.target.value)
  }

  return <div className={styles.events} style={{minHeight:300}}>
    <Spin spinning={eventListLoading} style={{marginTop:60}}>
      {
        simpleRender ? <div>
            {render()}
          </div>
          :
          <div>
            <Radio.Group onChange={onRadioChange} value={currentType}>
              {
                Object.keys(customerEventType).map(key => {
                  return <Radio value={key}>{customerEventType[key]}</Radio>
                })
              }
            </Radio.Group>
            <div style={{marginTop: 40}}>
              {render()}
              <Spin spinning={loadingMore}>
                <div style={{clear: 'both', height: '30px', width: '100%'}} ref={loadMoreRef}/>
              </Spin>
              <BackTop/>
              {
                noMore && eventsList?.length > 0 &&
                <div style={{display: 'flex', justifyContent: 'center', color: '#aaa'}}>没有更多信息了</div>
              }
            </div>
          </div>
      }
    </Spin>
    {
      !simpleRender && eventsList?.length === 0 && !eventListLoading && <Empty image={Empty.PRESENTED_IMAGE_SIMPLE}/>
    }
  </div>

}
export default Events;
