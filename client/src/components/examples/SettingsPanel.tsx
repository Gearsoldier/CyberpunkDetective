import { useState } from 'react';
import SettingsPanel from '../SettingsPanel';
import { Button } from '@/components/ui/button';

export default function SettingsPanelExample() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button onClick={() => setOpen(true)}>Open Settings</Button>
      <SettingsPanel
        open={open}
        onClose={() => setOpen(false)}
      />
    </>
  );
}
