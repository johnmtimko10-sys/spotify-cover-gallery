import * as SliderPrimitive from "@radix-ui/react-slider";
import { Power, Sun, SunDim } from "lucide-react";
import type { CSSProperties } from "react";
import { Frame } from "./Frame";
import { BulbIcon } from "./icons";
import { LIGHT_PRESETS, fromHue, toCss } from "./lights";
import { useDisplay } from "./state";

function GlowSlider({
  value,
  onChange,
  trackStyle,
  trackClassName = "",
  label,
  disabled,
  min = 1,
  max = 100,
}: {
  value: number;
  onChange: (v: number) => void;
  trackStyle?: CSSProperties;
  trackClassName?: string;
  label: string;
  disabled?: boolean;
  min?: number;
  max?: number;
}) {
  return (
    <SliderPrimitive.Root
      value={[value]}
      onValueChange={([v]) => onChange(v ?? value)}
      max={max}
      min={min}
      step={1}
      disabled={disabled}
      className="relative flex h-[4.4cqw] w-full touch-none select-none items-center data-[disabled]:opacity-40"
    >
      <SliderPrimitive.Track
        className={`relative h-[2.4cqw] w-full grow overflow-hidden rounded-full border border-border ${trackClassName}`}
        style={trackStyle}
      >
      </SliderPrimitive.Track>
      <SliderPrimitive.Thumb aria-label={label} className="slider-thumb block size-[3.6cqw] cursor-grab rounded-full active:cursor-grabbing" />
    </SliderPrimitive.Root>
  );
}

export function LightsApp() {
  const { lights } = useDisplay();
  const color = toCss(lights.color);

  return (
    <Frame title="Lights">
      <main className="mx-auto mt-[3cqw] grid w-[88cqw] grid-cols-[34cqw_1fr] gap-[3cqw]">
        <section
          className={`relative flex h-[38cqw] flex-col items-center justify-center overflow-hidden rounded-[2.6cqw] transition-all duration-500 ${
            lights.on ? "tile-light" : "tile-green-off"
          }`}
          style={{ "--light": color, "--light-strength": `${lights.on ? lights.brightness : 0}%` } as CSSProperties}
        >
          <BulbIcon on={lights.on} color={color} brightness={lights.brightness} className="w-[19cqw]" />
          <p className={`mt-[1.4cqw] text-[3.2cqw] font-semibold tracking-tight ${lights.on ? "text-foreground" : "text-off"}`}>
            {lights.on ? `${lights.brightness}%` : "Off"}
          </p>
          <p className="text-[1.6cqw] text-muted-foreground">{lights.color.name}</p>
          <button
            type="button"
            onClick={() => lights.setOn(!lights.on)}
            aria-pressed={lights.on}
            aria-label={lights.on ? "Turn lights off" : "Turn lights on"}
            className={`mt-[1.6cqw] flex items-center gap-[0.8cqw] rounded-full px-[2.2cqw] py-[0.9cqw] text-[1.6cqw] font-semibold transition-all active:scale-95 ${
              lights.on ? "bg-foreground text-background" : "bg-glow-green text-primary-foreground"
            }`}
          >
            <Power className="h-auto w-[1.8cqw]" strokeWidth={2.6} />
            {lights.on ? "Turn off" : "Turn on"}
          </button>
        </section>

        <section className="panel flex h-[38cqw] flex-col gap-[2.2cqw] rounded-[2.6cqw] p-[2.6cqw]">
          <div>
            <div className="mb-[0.6cqw] flex items-center justify-between">
              <h2 className="text-[1.9cqw] font-semibold text-foreground">Brightness</h2>
              <span className="text-[1.7cqw] tabular-nums text-muted-foreground">{lights.brightness}%</span>
            </div>
            <div className="flex items-center gap-[1.4cqw] text-muted-foreground">
              <SunDim className="h-auto w-[2.4cqw] shrink-0" />
              <GlowSlider
                label="Brightness"
                value={lights.brightness}
                onChange={lights.setBrightness}
                disabled={!lights.on}
                trackStyle={{ background: `linear-gradient(to right, var(--muted), ${color})` }}
              />
              <Sun className="h-auto w-[2.6cqw] shrink-0" />
            </div>
          </div>

          <div>
            <h2 className="mb-[1cqw] text-[1.9cqw] font-semibold text-foreground">Color</h2>
            <div className="grid grid-cols-8 gap-[1.2cqw]">
              {LIGHT_PRESETS.map((p) => {
                const active = lights.color.name === p.name;
                return (
                  <button
                    key={p.name}
                    type="button"
                    onClick={() => {
                      lights.setColor(p);
                      if (!lights.on) lights.setOn(true);
                    }}
                    aria-label={p.name}
                    aria-pressed={active}
                    title={p.name}
                    className={`swatch aspect-square w-full rounded-full transition-transform hover:scale-110 active:scale-95 ${active ? "swatch-active" : ""}`}
                    style={{ "--swatch": toCss(p) } as CSSProperties}
                  />
                );
              })}
            </div>
          </div>

          <div>
            <div className="mb-[0.6cqw] flex items-center justify-between">
              <h2 className="text-[1.9cqw] font-semibold text-foreground">Custom color</h2>
              <span
                className="size-[2cqw] rounded-full border border-border"
                style={{ background: lights.color.name === "Custom" ? color : "transparent" }}
              />
            </div>
            <GlowSlider
              label="Hue"
              value={lights.color.h}
              min={0}
              max={360}
              onChange={(h) => {
                lights.setColor(fromHue(h));
                if (!lights.on) lights.setOn(true);
              }}
              trackClassName="hue-track"
            />
          </div>
        </section>
      </main>
    </Frame>
  );
}
