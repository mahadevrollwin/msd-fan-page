"""Cut out Dhoni photos and export premium shadowed section graphics."""

from __future__ import annotations

from pathlib import Path

from PIL import Image, ImageEnhance, ImageFilter, ImageOps
from rembg import remove

ASSETS = Path(
    r"C:\Users\User\.cursor\projects\c-Users-User-Downloads-MS-Dhon-Website\assets"
)
OUT = Path(r"C:\Users\User\Downloads\MS-Dhon-Website\public\silhouettes")

JOBS = [
    # (source filename, output stem, facing hint)
    ("Image_3_1-ed578bd1-0797-4da1-8658-a2324224d59c.jpg", "stump", "left"),
    ("Image_5-05c7f447-40cb-4b4b-ac46-194b3d9dacf8.jpg", "celebrate", "right"),
    ("Image_4-137c604d-5805-4ed5-bf60-827f26ad4c7d.jpg", "smile", "left"),
    ("Image_1_1-36bb995d-91bd-4749-8d4e-5cbb65854539.jpg", "walk", "right"),
    ("Image_2_1-b9016ff8-9ab8-4645-9d15-9ec18a4450f5.jpg", "stride", "left"),
    ("Image_6-b8af9edf-6e89-4283-b5f7-d4dfca948bd9.jpg", "jog", "right"),
]


def trim_transparent(img: Image.Image, pad: int = 24) -> Image.Image:
    bbox = img.getbbox()
    if not bbox:
        return img
    left, top, right, bottom = bbox
    left = max(0, left - pad)
    top = max(0, top - pad)
    right = min(img.width, right + pad)
    bottom = min(img.height, bottom + pad)
    return img.crop((left, top, right, bottom))


def to_shadow(cutout: Image.Image) -> Image.Image:
    """Near-black shadowed figure with soft alpha — premium silhouette."""
    rgba = cutout.convert("RGBA")
    alpha = rgba.getchannel("A")
    # Soften silhouette edge slightly
    alpha = alpha.filter(ImageFilter.GaussianBlur(radius=0.8))
    # Fill body with deep charcoal (not pure black) for softer blend on pitch
    shadow = Image.new("RGBA", rgba.size, (12, 12, 14, 0))
    body = Image.new("RGBA", rgba.size, (12, 12, 14, 255))
    shadow = Image.composite(body, shadow, alpha)
    # Feather outer alpha a touch more for premium softness
    soft = shadow.getchannel("A").filter(ImageFilter.GaussianBlur(radius=1.2))
    shadow.putalpha(soft)
    return shadow


def to_ghost(cutout: Image.Image) -> Image.Image:
    """Dark desaturated photographic ghost — richer than flat silhouette."""
    rgba = cutout.convert("RGBA")
    rgb = rgba.convert("RGB")
    gray = ImageOps.grayscale(rgb)
    # Lift midtones slightly then crush for atmosphere
    gray = ImageEnhance.Contrast(gray).enhance(1.25)
    gray = ImageEnhance.Brightness(gray).enhance(0.42)
    # Warm gold cast into the shadows
    tinted = Image.merge(
        "RGB",
        (
            gray.point(lambda p: min(255, int(p * 1.08 + 8))),
            gray.point(lambda p: min(255, int(p * 0.95 + 4))),
            gray.point(lambda p: min(255, int(p * 0.72))),
        ),
    )
    alpha = rgba.getchannel("A").filter(ImageFilter.GaussianBlur(radius=0.6))
    out = Image.new("RGBA", rgba.size)
    out.paste(tinted, (0, 0))
    out.putalpha(alpha)
    return out


def fit_height(img: Image.Image, height: int = 1600) -> Image.Image:
    ratio = height / img.height
    width = max(1, int(img.width * ratio))
    return img.resize((width, height), Image.Resampling.LANCZOS)


def main() -> None:
    OUT.mkdir(parents=True, exist_ok=True)
    for src_name, stem, _facing in JOBS:
        src = ASSETS / src_name
        print(f"Processing {stem} from {src_name}…")
        original = Image.open(src).convert("RGBA")
        cut = remove(original)
        cut = trim_transparent(cut)
        cut = fit_height(cut, 1600)

        ghost = to_ghost(cut)
        shadow = to_shadow(cut)

        ghost_path = OUT / f"dhoni-{stem}.png"
        shadow_path = OUT / f"dhoni-{stem}-shadow.png"
        ghost.save(ghost_path, "PNG", optimize=True)
        shadow.save(shadow_path, "PNG", optimize=True)
        print(f"  wrote {ghost_path.name} ({ghost_path.stat().st_size // 1024} KB)")
        print(f"  wrote {shadow_path.name} ({shadow_path.stat().st_size // 1024} KB)")

    print("Done.")


if __name__ == "__main__":
    main()
