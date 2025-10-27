import ToolPanel from '../ToolPanel';

export default function ToolPanelExample() {
  return (
    <div className="h-[600px]">
      <ToolPanel availableTools={["search", "whois", "metadata", "pastebin"]} />
    </div>
  );
}
