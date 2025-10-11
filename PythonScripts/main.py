#!/usr/bin/env python3
"""
Python Scripts Collection for Hacktoberfest 2025
A collection of useful Python scripts demonstrating various programming concepts.
"""

import os
import sys
import json
import random
import datetime
import hashlib
import requests
from typing import List, Dict, Any
import argparse

class PythonScriptsCollection:
    """Collection of useful Python scripts for Hacktoberfest 2025"""
    
    def __init__(self):
        self.scripts = {
            'password_generator': self.password_generator,
            'file_organizer': self.file_organizer,
            'web_scraper': self.web_scraper,
            'data_analyzer': self.data_analyzer,
            'system_monitor': self.system_monitor,
            'text_processor': self.text_processor,
            'encryption_tool': self.encryption_tool,
            'backup_manager': self.backup_manager
        }
    
    def password_generator(self, length: int = 12, include_symbols: bool = True) -> str:
        """
        Generate a secure random password.
        
        Args:
            length: Length of the password (default: 12)
            include_symbols: Whether to include special symbols (default: True)
        
        Returns:
            Generated password string
        """
        import string
        
        characters = string.ascii_letters + string.digits
        if include_symbols:
            characters += "!@#$%^&*()_+-=[]{}|;:,.<>?"
        
        password = ''.join(random.choice(characters) for _ in range(length))
        return password
    
    def file_organizer(self, directory: str) -> Dict[str, List[str]]:
        """
        Organize files in a directory by extension.
        
        Args:
            directory: Path to the directory to organize
        
        Returns:
            Dictionary mapping file extensions to lists of files
        """
        if not os.path.exists(directory):
            raise FileNotFoundError(f"Directory {directory} not found")
        
        organized_files = {}
        
        for filename in os.listdir(directory):
            file_path = os.path.join(directory, filename)
            if os.path.isfile(file_path):
                _, ext = os.path.splitext(filename)
                ext = ext.lower() if ext else 'no_extension'
                
                if ext not in organized_files:
                    organized_files[ext] = []
                organized_files[ext].append(filename)
        
        return organized_files
    
    def web_scraper(self, url: str, output_file: str = None) -> Dict[str, Any]:
        """
        Simple web scraper to extract basic information from a webpage.
        
        Args:
            url: URL to scrape
            output_file: Optional file to save the results
        
        Returns:
            Dictionary containing scraped data
        """
        try:
            response = requests.get(url, timeout=10)
            response.raise_for_status()
            
            from bs4 import BeautifulSoup
            soup = BeautifulSoup(response.content, 'html.parser')
            
            data = {
                'url': url,
                'title': soup.title.string if soup.title else 'No title',
                'headings': [h.get_text().strip() for h in soup.find_all(['h1', 'h2', 'h3'])],
                'links': [a.get('href') for a in soup.find_all('a', href=True)],
                'images': [img.get('src') for img in soup.find_all('img', src=True)],
                'text_length': len(soup.get_text()),
                'scraped_at': datetime.datetime.now().isoformat()
            }
            
            if output_file:
                with open(output_file, 'w', encoding='utf-8') as f:
                    json.dump(data, f, indent=2, ensure_ascii=False)
            
            return data
            
        except requests.RequestException as e:
            return {'error': f'Failed to scrape {url}: {str(e)}'}
    
    def data_analyzer(self, data: List[float]) -> Dict[str, float]:
        """
        Analyze numerical data and return statistics.
        
        Args:
            data: List of numerical values
        
        Returns:
            Dictionary containing statistical analysis
        """
        if not data:
            return {'error': 'No data provided'}
        
        import statistics
        
        analysis = {
            'count': len(data),
            'sum': sum(data),
            'mean': statistics.mean(data),
            'median': statistics.median(data),
            'mode': statistics.mode(data) if len(set(data)) < len(data) else 'No mode',
            'min': min(data),
            'max': max(data),
            'range': max(data) - min(data),
            'variance': statistics.variance(data) if len(data) > 1 else 0,
            'stdev': statistics.stdev(data) if len(data) > 1 else 0
        }
        
        return analysis
    
    def system_monitor(self) -> Dict[str, Any]:
        """
        Monitor system resources and return current status.
        
        Returns:
            Dictionary containing system information
        """
        import psutil
        
        try:
            system_info = {
                'cpu_percent': psutil.cpu_percent(interval=1),
                'memory': {
                    'total': psutil.virtual_memory().total,
                    'available': psutil.virtual_memory().available,
                    'percent': psutil.virtual_memory().percent,
                    'used': psutil.virtual_memory().used
                },
                'disk': {
                    'total': psutil.disk_usage('/').total,
                    'used': psutil.disk_usage('/').used,
                    'free': psutil.disk_usage('/').free,
                    'percent': psutil.disk_usage('/').percent
                },
                'boot_time': datetime.datetime.fromtimestamp(psutil.boot_time()).isoformat(),
                'processes': len(psutil.pids())
            }
            
            return system_info
            
        except ImportError:
            return {'error': 'psutil library not available. Install with: pip install psutil'}
    
    def text_processor(self, text: str, operation: str) -> str:
        """
        Process text with various operations.
        
        Args:
            text: Input text to process
            operation: Operation to perform ('reverse', 'uppercase', 'lowercase', 'word_count', 'char_count')
        
        Returns:
            Processed text or analysis result
        """
        operations = {
            'reverse': lambda t: t[::-1],
            'uppercase': lambda t: t.upper(),
            'lowercase': lambda t: t.lower(),
            'word_count': lambda t: len(t.split()),
            'char_count': lambda t: len(t),
            'remove_spaces': lambda t: t.replace(' ', ''),
            'title_case': lambda t: t.title(),
            'swap_case': lambda t: t.swapcase()
        }
        
        if operation not in operations:
            return f"Unknown operation: {operation}. Available: {', '.join(operations.keys())}"
        
        return operations[operation](text)
    
    def encryption_tool(self, text: str, key: str, operation: str = 'encrypt') -> str:
        """
        Simple encryption/decryption tool using Caesar cipher.
        
        Args:
            text: Text to encrypt/decrypt
            key: Encryption key (integer)
            operation: 'encrypt' or 'decrypt'
        
        Returns:
            Encrypted or decrypted text
        """
        try:
            key = int(key)
        except ValueError:
            return "Key must be an integer"
        
        if operation == 'decrypt':
            key = -key
        
        result = ""
        for char in text:
            if char.isalpha():
                ascii_offset = 65 if char.isupper() else 97
                shifted = (ord(char) - ascii_offset + key) % 26
                result += chr(shifted + ascii_offset)
            else:
                result += char
        
        return result
    
    def backup_manager(self, source_dir: str, backup_dir: str) -> Dict[str, Any]:
        """
        Create a backup of a directory with metadata.
        
        Args:
            source_dir: Source directory to backup
            backup_dir: Destination directory for backup
        
        Returns:
            Dictionary containing backup information
        """
        import shutil
        
        if not os.path.exists(source_dir):
            return {'error': f'Source directory {source_dir} not found'}
        
        try:
            timestamp = datetime.datetime.now().strftime('%Y%m%d_%H%M%S')
            backup_name = f"backup_{timestamp}"
            backup_path = os.path.join(backup_dir, backup_name)
            
            os.makedirs(backup_path, exist_ok=True)
            
            # Copy files
            for root, dirs, files in os.walk(source_dir):
                for file in files:
                    src_path = os.path.join(root, file)
                    rel_path = os.path.relpath(src_path, source_dir)
                    dst_path = os.path.join(backup_path, rel_path)
                    
                    os.makedirs(os.path.dirname(dst_path), exist_ok=True)
                    shutil.copy2(src_path, dst_path)
            
            # Create metadata
            metadata = {
                'source_directory': source_dir,
                'backup_directory': backup_path,
                'backup_time': datetime.datetime.now().isoformat(),
                'files_backed_up': sum(len(files) for _, _, files in os.walk(backup_path))
            }
            
            with open(os.path.join(backup_path, 'backup_metadata.json'), 'w') as f:
                json.dump(metadata, f, indent=2)
            
            return metadata
            
        except Exception as e:
            return {'error': f'Backup failed: {str(e)}'}

def main():
    """Main function to run the Python scripts collection"""
    parser = argparse.ArgumentParser(description='Python Scripts Collection for Hacktoberfest 2025')
    parser.add_argument('script', choices=['password_generator', 'file_organizer', 'web_scraper', 
                                         'data_analyzer', 'system_monitor', 'text_processor', 
                                         'encryption_tool', 'backup_manager', 'list'],
                       help='Script to run or "list" to show available scripts')
    parser.add_argument('--args', nargs='*', help='Arguments for the script')
    parser.add_argument('--interactive', '-i', action='store_true', help='Run in interactive mode')
    
    args = parser.parse_args()
    
    collection = PythonScriptsCollection()
    
    if args.script == 'list':
        print("Available Python Scripts:")
        print("=" * 40)
        for script_name, script_func in collection.scripts.items():
            print(f"• {script_name}: {script_func.__doc__.split('.')[0] if script_func.__doc__ else 'No description'}")
        return
    
    if args.interactive:
        run_interactive_mode(collection)
    else:
        run_script(collection, args.script, args.args or [])

def run_interactive_mode(collection):
    """Run the collection in interactive mode"""
    print("🐍 Python Scripts Collection - Interactive Mode")
    print("=" * 50)
    
    while True:
        print("\nAvailable scripts:")
        for i, script_name in enumerate(collection.scripts.keys(), 1):
            print(f"{i}. {script_name}")
        print("0. Exit")
        
        try:
            choice = input("\nSelect a script (number): ").strip()
            
            if choice == '0':
                print("Goodbye! 👋")
                break
            
            script_index = int(choice) - 1
            script_names = list(collection.scripts.keys())
            
            if 0 <= script_index < len(script_names):
                script_name = script_names[script_index]
                run_script_interactive(collection, script_name)
            else:
                print("Invalid choice. Please try again.")
                
        except (ValueError, KeyboardInterrupt):
            print("\nGoodbye! 👋")
            break

def run_script_interactive(collection, script_name):
    """Run a specific script in interactive mode"""
    script_func = collection.scripts[script_name]
    
    print(f"\n🔧 Running {script_name}")
    print("-" * 30)
    
    try:
        if script_name == 'password_generator':
            length = int(input("Password length (default 12): ") or "12")
            symbols = input("Include symbols? (y/n, default y): ").lower() != 'n'
            result = script_func(length, symbols)
            print(f"Generated password: {result}")
            
        elif script_name == 'file_organizer':
            directory = input("Directory path: ")
            result = script_func(directory)
            print(f"Organized files: {json.dumps(result, indent=2)}")
            
        elif script_name == 'web_scraper':
            url = input("URL to scrape: ")
            output = input("Output file (optional): ") or None
            result = script_func(url, output)
            print(f"Scraping result: {json.dumps(result, indent=2)}")
            
        elif script_name == 'data_analyzer':
            data_input = input("Enter numbers separated by commas: ")
            data = [float(x.strip()) for x in data_input.split(',')]
            result = script_func(data)
            print(f"Analysis result: {json.dumps(result, indent=2)}")
            
        elif script_name == 'system_monitor':
            result = script_func()
            print(f"System status: {json.dumps(result, indent=2)}")
            
        elif script_name == 'text_processor':
            text = input("Enter text: ")
            operation = input("Operation (reverse/uppercase/lowercase/word_count/char_count): ")
            result = script_func(text, operation)
            print(f"Result: {result}")
            
        elif script_name == 'encryption_tool':
            text = input("Enter text: ")
            key = input("Enter key (integer): ")
            operation = input("Operation (encrypt/decrypt): ")
            result = script_func(text, key, operation)
            print(f"Result: {result}")
            
        elif script_name == 'backup_manager':
            source = input("Source directory: ")
            backup = input("Backup directory: ")
            result = script_func(source, backup)
            print(f"Backup result: {json.dumps(result, indent=2)}")
            
    except Exception as e:
        print(f"Error running {script_name}: {str(e)}")

def run_script(collection, script_name, script_args):
    """Run a specific script with command line arguments"""
    script_func = collection.scripts[script_name]
    
    try:
        if script_name == 'password_generator':
            length = int(script_args[0]) if script_args else 12
            symbols = script_args[1].lower() != 'false' if len(script_args) > 1 else True
            result = script_func(length, symbols)
            print(result)
            
        elif script_name == 'file_organizer':
            directory = script_args[0] if script_args else '.'
            result = script_func(directory)
            print(json.dumps(result, indent=2))
            
        elif script_name == 'web_scraper':
            url = script_args[0] if script_args else 'https://example.com'
            output = script_args[1] if len(script_args) > 1 else None
            result = script_func(url, output)
            print(json.dumps(result, indent=2))
            
        elif script_name == 'data_analyzer':
            data = [float(x) for x in script_args] if script_args else [1, 2, 3, 4, 5]
            result = script_func(data)
            print(json.dumps(result, indent=2))
            
        elif script_name == 'system_monitor':
            result = script_func()
            print(json.dumps(result, indent=2))
            
        elif script_name == 'text_processor':
            text = script_args[0] if script_args else 'Hello World'
            operation = script_args[1] if len(script_args) > 1 else 'uppercase'
            result = script_func(text, operation)
            print(result)
            
        elif script_name == 'encryption_tool':
            text = script_args[0] if script_args else 'Hello'
            key = script_args[1] if len(script_args) > 1 else '3'
            operation = script_args[2] if len(script_args) > 2 else 'encrypt'
            result = script_func(text, key, operation)
            print(result)
            
        elif script_name == 'backup_manager':
            source = script_args[0] if script_args else '.'
            backup = script_args[1] if len(script_args) > 1 else './backups'
            result = script_func(source, backup)
            print(json.dumps(result, indent=2))
            
    except Exception as e:
        print(f"Error: {str(e)}", file=sys.stderr)
        sys.exit(1)

if __name__ == "__main__":
    main()
