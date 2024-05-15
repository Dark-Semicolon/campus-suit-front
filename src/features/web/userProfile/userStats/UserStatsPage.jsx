import HeroLinks from '@/components/HeroLinks';
import StatsCard from '@/components/StatsCard';
import { useUserStats } from './hooks/useUserStats';
import { Spinner } from '@nextui-org/react';
function UserStatsPage() {

  const { userStats, isPending } = useUserStats()

  return (
    <section>
      <div className="pt-3 pb-10 space-y-5">

        <h2 className="text-xl md:text-3xl text-blue-color-primary">
          الأحصائيات <span className="text-yellow-color-primary">الخاصة</span>
        </h2>
        <HeroLinks pages={[
          { name: 'الأحصائيات الخاصة', link: `user/quizResults` },
          { name: "الصفحة الرئيسية", link: "/" },
          { name: "الملف الشخصي", link: "/user/profile" },
        ]} />
      </div>


      <section className="flex flex-wrap justify-center gap-5 py-10">
        {isPending ? <div className='py-5 mx-auto'>
          <Spinner color='warning' size='lg' />
        </div> :
          <>
            <StatsCard title='الفيديوهات المنجزة'
              icon={<img src='/images/profile/video.gif' width={100} />}
              data={`${userStats?.watchedVideosCount} فيديوهات`}
            />

            <StatsCard title='الأختبارات المنجزة'
              icon={<img src='/images/profile/exam.gif' width={100} />}
              data={`${userStats?.quizzesAttendsCount} أختبارات`}
            />

            <StatsCard title='متوسط النتائج'
              icon={<img src='/images/profile/award.gif' width={100} />}
              data={`المتوسط ${userStats?.quizzesAvgScores || 0}% `}
            />

          </>
        }
      </section>
    </section>
  )
}

export default UserStatsPage;
