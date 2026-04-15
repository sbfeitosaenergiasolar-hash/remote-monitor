#!/usr/bin/env python3
"""
Create a WebView wrapper APK that opens a custom URL
Uses apktool to decompile, modify, and recompile
"""

import os
import sys
import json
import shutil
import subprocess
from pathlib import Path

def run_cmd(cmd, timeout=120):
    """Execute shell command"""
    print(f"[CMD] {cmd}")
    try:
        result = subprocess.run(cmd, shell=True, capture_output=True, text=True, timeout=timeout)
        if result.returncode != 0:
            print(f"[ERROR] {result.stderr}")
            raise Exception(f"Command failed: {cmd}")
        return result.stdout
    except subprocess.TimeoutExpired:
        raise Exception(f"Command timed out: {cmd}")

def create_wrapper_apk(app_name, app_url, base_apk_path, output_dir):
    """Generate wrapper APK"""
    
    print(f"\n{'='*60}")
    print(f"Creating WebView Wrapper APK")
    print(f"{'='*60}")
    print(f"App Name: {app_name}")
    print(f"App URL: {app_url}")
    print(f"Base APK: {base_apk_path}")
    print(f"Output Dir: {output_dir}")
    
    # Create work directory
    import time
    timestamp = int(time.time() * 1000)
    work_dir = f"/tmp/apk-wrapper-{timestamp}"
    decompile_dir = os.path.join(work_dir, "decompiled")
    
    os.makedirs(decompile_dir, exist_ok=True)
    print(f"\n[STEP 1] Work directory: {work_dir}")
    
    try:
        # Copy base APK
        work_apk = os.path.join(work_dir, "base.apk")
        shutil.copy(base_apk_path, work_apk)
        print(f"[STEP 2] Base APK copied to work directory")
        
        # Decompile with apktool
        print(f"[STEP 3] Decompiling APK with apktool...")
        run_cmd(f'java -jar /tmp/Lib/apktool.jar d -f "{work_apk}" -o "{decompile_dir}"', timeout=60)
        print(f"✓ APK decompiled successfully")
        
        # Modify AndroidManifest.xml to add custom URL as metadata
        manifest_path = os.path.join(decompile_dir, "AndroidManifest.xml")
        print(f"\n[STEP 4] Modifying AndroidManifest.xml...")
        
        with open(manifest_path, 'r', encoding='utf-8') as f:
            manifest = f.read()
        
        # Add custom URL as metadata in the application tag
        metadata = f'<meta-data android:name="app_url" android:value="{app_url}" />'
        
        # Insert before </application>
        if '</application>' in manifest:
            manifest = manifest.replace('</application>', f'        {metadata}\n    </application>')
        
        with open(manifest_path, 'w', encoding='utf-8') as f:
            f.write(manifest)
        print(f"✓ Added custom URL metadata to AndroidManifest.xml")
        
        # Store config in assets for the app to read
        assets_dir = os.path.join(decompile_dir, "assets")
        os.makedirs(assets_dir, exist_ok=True)
        
        config = {
            "appName": app_name,
            "appUrl": app_url,
            "generatedAt": time.strftime("%Y-%m-%d %H:%M:%S")
        }
        
        config_path = os.path.join(assets_dir, "app-config.json")
        with open(config_path, 'w') as f:
            json.dump(config, f, indent=2)
        print(f"✓ Stored app config in assets")
        
        # Recompile with apktool
        print(f"\n[STEP 5] Recompiling APK...")
        compiled_apk = os.path.join(work_dir, "compiled.apk")
        run_cmd(f'java -jar /tmp/Lib/apktool.jar b "{decompile_dir}" -o "{compiled_apk}"', timeout=120)
        print(f"✓ APK recompiled successfully")
        
        # Copy to output directory
        os.makedirs(output_dir, exist_ok=True)
        sanitized_name = app_name.replace(' ', '-').replace('/', '-').lower()
        final_apk_name = f"{sanitized_name}-{timestamp}.apk"
        final_apk_path = os.path.join(output_dir, final_apk_name)
        
        shutil.copy(compiled_apk, final_apk_path)
        print(f"\n[STEP 6] APK saved to: {final_apk_path}")
        
        # Get file size
        file_size = os.path.getsize(final_apk_path) / (1024 * 1024)
        print(f"✓ Final APK size: {file_size:.2f}MB")
        
        print(f"\n{'='*60}")
        print(f"✓ SUCCESS! APK wrapper created")
        print(f"{'='*60}")
        print(f"Output: {final_apk_path}")
        print(f"Filename: {final_apk_name}")
        
        return {
            "success": True,
            "apk_path": final_apk_path,
            "filename": final_apk_name,
            "size_mb": file_size
        }
        
    except Exception as e:
        print(f"\n[ERROR] {str(e)}")
        return {
            "success": False,
            "error": str(e)
        }

if __name__ == "__main__":
    if len(sys.argv) < 4:
        print("Usage: python3 create_wrapper_apk.py <app_name> <app_url> <base_apk_path> [output_dir]")
        sys.exit(1)
    
    app_name = sys.argv[1]
    app_url = sys.argv[2]
    base_apk_path = sys.argv[3]
    output_dir = sys.argv[4] if len(sys.argv) > 4 else "/tmp/apk-output"
    
    result = create_wrapper_apk(app_name, app_url, base_apk_path, output_dir)
    
    # Print result as JSON for parsing
    print(f"\n[RESULT] {json.dumps(result)}")
    
    sys.exit(0 if result["success"] else 1)
