import HUD from '../HUD';

export default function HUDExample() {
  return (
    <HUD
      currentMission={2}
      totalMissions={5}
      completedMissions={1}
      onSettingsClick={() => console.log('Settings clicked')}
    />
  );
}
