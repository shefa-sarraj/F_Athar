#!/bin/bash
set -e

IMAGES_DIR="$1"
BATCH_SIZE="${2:-30}"

if [ -z "$IMAGES_DIR" ]; then
  echo "الاستخدام: ./push_images_batches.sh <مجلد الصور> [عدد الصور بكل دفعة]"
  exit 1
fi

if [ ! -d "$IMAGES_DIR" ]; then
  echo "خطأ: المجلد '$IMAGES_DIR' مش موجود"
  exit 1
fi

mapfile -t FILES < <(git status --porcelain "$IMAGES_DIR" | grep -E '\.(jpg|jpeg|png|gif|webp)$' -i | awk '{print $2}')

TOTAL=${#FILES[@]}

if [ "$TOTAL" -eq 0 ]; then
  echo "ما في صور جديدة أو معدّلة داخل $IMAGES_DIR (كل شي مرفوع مسبقاً)."
  exit 0
fi

echo "لقيت $TOTAL صورة لسا مش مرفوعة."
echo "رح يتم الرفع على دفعات، كل دفعة $BATCH_SIZE صورة."
echo ""

BATCH_NUM=1
COUNT=0
BATCH=()

push_batch() {
  if [ ${#BATCH[@]} -eq 0 ]; then
    return
  fi
  echo "== دفعة رقم $BATCH_NUM (${#BATCH[@]} صورة) =="
  git add "${BATCH[@]}"
  git commit -m "Add images batch $BATCH_NUM"
  git push
  echo "== تم رفع الدفعة رقم $BATCH_NUM بنجاح =="
  echo ""
  BATCH_NUM=$((BATCH_NUM + 1))
  BATCH=()
  COUNT=0
}

for FILE in "${FILES[@]}"; do
  BATCH+=("$FILE")
  COUNT=$((COUNT + 1))
  if [ "$COUNT" -ge "$BATCH_SIZE" ]; then
    push_batch
  fi
done

push_batch

echo "تم رفع كل الصور بنجاح على دفعات."
