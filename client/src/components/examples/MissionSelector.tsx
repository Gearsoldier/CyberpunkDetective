import MissionSelector from '../MissionSelector';
import { missions } from '@/lib/missions';

export default function MissionSelectorExample() {
  return (
    <MissionSelector
      missions={missions}
      onSelectMission={(mission) => console.log('Selected mission:', mission.id)}
    />
  );
}
