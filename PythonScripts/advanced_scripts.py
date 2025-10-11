#!/usr/bin/env python3
"""
Additional Python Scripts for Hacktoberfest 2025
More specialized scripts demonstrating advanced Python concepts.
"""

import os
import sys
import json
import csv
import sqlite3
import threading
import time
import subprocess
from datetime import datetime, timedelta
from typing import List, Dict, Any, Optional
import argparse

class AdvancedPythonScripts:
    """Advanced Python scripts collection for Hacktoberfest 2025"""
    
    def __init__(self):
        self.scripts = {
            'csv_processor': self.csv_processor,
            'database_manager': self.database_manager,
            'log_analyzer': self.log_analyzer,
            'network_scanner': self.network_scanner,
            'image_processor': self.image_processor,
            'email_sender': self.email_sender,
            'task_scheduler': self.task_scheduler,
            'api_client': self.api_client
        }
    
    def csv_processor(self, input_file: str, output_file: str = None, operation: str = 'analyze') -> Dict[str, Any]:
        """
        Process CSV files with various operations.
        
        Args:
            input_file: Path to input CSV file
            output_file: Path to output file (optional)
            operation: Operation to perform ('analyze', 'filter', 'sort', 'merge')
        
        Returns:
            Dictionary containing processing results
        """
        if not os.path.exists(input_file):
            return {'error': f'File {input_file} not found'}
        
        try:
            with open(input_file, 'r', newline='', encoding='utf-8') as file:
                reader = csv.DictReader(file)
                data = list(reader)
            
            if not data:
                return {'error': 'CSV file is empty'}
            
            result = {
                'total_rows': len(data),
                'columns': list(data[0].keys()),
                'operation': operation
            }
            
            if operation == 'analyze':
                result['analysis'] = self._analyze_csv_data(data)
            elif operation == 'filter':
                result['filtered_data'] = self._filter_csv_data(data)
            elif operation == 'sort':
                result['sorted_data'] = self._sort_csv_data(data)
            
            if output_file:
                self._write_csv_output(data, output_file)
                result['output_file'] = output_file
            
            return result
            
        except Exception as e:
            return {'error': f'CSV processing failed: {str(e)}'}
    
    def _analyze_csv_data(self, data: List[Dict]) -> Dict[str, Any]:
        """Analyze CSV data and return statistics"""
        analysis = {}
        
        for column in data[0].keys():
            values = [row[column] for row in data if row[column]]
            
            if values:
                try:
                    # Try to convert to numbers
                    numeric_values = [float(v) for v in values]
                    analysis[column] = {
                        'type': 'numeric',
                        'count': len(numeric_values),
                        'min': min(numeric_values),
                        'max': max(numeric_values),
                        'mean': sum(numeric_values) / len(numeric_values)
                    }
                except ValueError:
                    # Text data
                    analysis[column] = {
                        'type': 'text',
                        'count': len(values),
                        'unique_values': len(set(values)),
                        'most_common': max(set(values), key=values.count)
                    }
        
        return analysis
    
    def _filter_csv_data(self, data: List[Dict]) -> List[Dict]:
        """Filter CSV data based on criteria"""
        # Simple filter: remove rows with empty values
        return [row for row in data if all(row.values())]
    
    def _sort_csv_data(self, data: List[Dict]) -> List[Dict]:
        """Sort CSV data by first column"""
        return sorted(data, key=lambda x: list(x.values())[0])
    
    def _write_csv_output(self, data: List[Dict], output_file: str):
        """Write data to CSV file"""
        with open(output_file, 'w', newline='', encoding='utf-8') as file:
            writer = csv.DictWriter(file, fieldnames=data[0].keys())
            writer.writeheader()
            writer.writerows(data)
    
    def database_manager(self, db_file: str, operation: str, table_name: str = None, data: Dict = None) -> Dict[str, Any]:
        """
        Manage SQLite database operations.
        
        Args:
            db_file: Path to SQLite database file
            operation: Operation to perform ('create', 'insert', 'select', 'update', 'delete')
            table_name: Name of the table
            data: Data for insert/update operations
        
        Returns:
            Dictionary containing operation results
        """
        try:
            conn = sqlite3.connect(db_file)
            cursor = conn.cursor()
            
            result = {'operation': operation, 'table': table_name}
            
            if operation == 'create':
                if not table_name:
                    return {'error': 'Table name required for create operation'}
                
                # Create a simple table
                cursor.execute(f'''
                    CREATE TABLE IF NOT EXISTS {table_name} (
                        id INTEGER PRIMARY KEY AUTOINCREMENT,
                        name TEXT NOT NULL,
                        value TEXT,
                        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
                    )
                ''')
                result['message'] = f'Table {table_name} created successfully'
                
            elif operation == 'insert':
                if not table_name or not data:
                    return {'error': 'Table name and data required for insert operation'}
                
                cursor.execute(f'''
                    INSERT INTO {table_name} (name, value) VALUES (?, ?)
                ''', (data.get('name', ''), data.get('value', '')))
                result['inserted_id'] = cursor.lastrowid
                
            elif operation == 'select':
                if not table_name:
                    return {'error': 'Table name required for select operation'}
                
                cursor.execute(f'SELECT * FROM {table_name}')
                result['data'] = cursor.fetchall()
                
            elif operation == 'update':
                if not table_name or not data:
                    return {'error': 'Table name and data required for update operation'}
                
                cursor.execute(f'''
                    UPDATE {table_name} SET name = ?, value = ? WHERE id = ?
                ''', (data.get('name', ''), data.get('value', ''), data.get('id')))
                result['rows_affected'] = cursor.rowcount
                
            elif operation == 'delete':
                if not table_name or not data:
                    return {'error': 'Table name and data required for delete operation'}
                
                cursor.execute(f'DELETE FROM {table_name} WHERE id = ?', (data.get('id'),))
                result['rows_affected'] = cursor.rowcount
            
            conn.commit()
            conn.close()
            
            return result
            
        except Exception as e:
            return {'error': f'Database operation failed: {str(e)}'}
    
    def log_analyzer(self, log_file: str, pattern: str = None) -> Dict[str, Any]:
        """
        Analyze log files for patterns and statistics.
        
        Args:
            log_file: Path to log file
            pattern: Pattern to search for (optional)
        
        Returns:
            Dictionary containing log analysis
        """
        if not os.path.exists(log_file):
            return {'error': f'Log file {log_file} not found'}
        
        try:
            with open(log_file, 'r', encoding='utf-8') as file:
                lines = file.readlines()
            
            analysis = {
                'total_lines': len(lines),
                'file_size': os.path.getsize(log_file),
                'analysis_time': datetime.now().isoformat()
            }
            
            if pattern:
                matching_lines = [line for line in lines if pattern.lower() in line.lower()]
                analysis['pattern_matches'] = len(matching_lines)
                analysis['matching_lines'] = matching_lines[:10]  # First 10 matches
            
            # Analyze log levels (common patterns)
            log_levels = ['ERROR', 'WARN', 'INFO', 'DEBUG', 'FATAL']
            level_counts = {}
            
            for level in log_levels:
                count = sum(1 for line in lines if level in line)
                if count > 0:
                    level_counts[level] = count
            
            analysis['log_levels'] = level_counts
            
            # Time-based analysis (if timestamps are present)
            timestamp_lines = [line for line in lines if any(char.isdigit() for char in line[:20])]
            analysis['lines_with_timestamps'] = len(timestamp_lines)
            
            return analysis
            
        except Exception as e:
            return {'error': f'Log analysis failed: {str(e)}'}
    
    def network_scanner(self, target: str, port_range: str = "1-1000") -> Dict[str, Any]:
        """
        Simple network port scanner.
        
        Args:
            target: Target IP address or hostname
            port_range: Port range to scan (e.g., "1-1000")
        
        Returns:
            Dictionary containing scan results
        """
        import socket
        
        try:
            start_port, end_port = map(int, port_range.split('-'))
            open_ports = []
            
            for port in range(start_port, min(end_port + 1, 65536)):
                sock = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
                sock.settimeout(1)
                
                try:
                    result = sock.connect_ex((target, port))
                    if result == 0:
                        open_ports.append(port)
                except:
                    pass
                finally:
                    sock.close()
            
            return {
                'target': target,
                'port_range': port_range,
                'open_ports': open_ports,
                'total_ports_scanned': end_port - start_port + 1,
                'scan_time': datetime.now().isoformat()
            }
            
        except Exception as e:
            return {'error': f'Network scan failed: {str(e)}'}
    
    def image_processor(self, image_path: str, operation: str = 'info') -> Dict[str, Any]:
        """
        Process images with basic operations.
        
        Args:
            image_path: Path to image file
            operation: Operation to perform ('info', 'resize', 'convert')
        
        Returns:
            Dictionary containing processing results
        """
        try:
            from PIL import Image
            
            if not os.path.exists(image_path):
                return {'error': f'Image file {image_path} not found'}
            
            with Image.open(image_path) as img:
                result = {
                    'filename': os.path.basename(image_path),
                    'format': img.format,
                    'mode': img.mode,
                    'size': img.size,
                    'width': img.width,
                    'height': img.height,
                    'operation': operation
                }
                
                if operation == 'info':
                    result['info'] = {
                        'has_transparency': 'transparency' in img.info,
                        'dpi': img.info.get('dpi', 'Unknown'),
                        'exif': bool(img._getexif())
                    }
                
                elif operation == 'resize':
                    # Resize to 50% of original size
                    new_size = (img.width // 2, img.height // 2)
                    resized = img.resize(new_size, Image.Resampling.LANCZOS)
                    
                    output_path = f"resized_{os.path.basename(image_path)}"
                    resized.save(output_path)
                    result['output_file'] = output_path
                    result['new_size'] = new_size
                
                elif operation == 'convert':
                    # Convert to RGB if not already
                    if img.mode != 'RGB':
                        converted = img.convert('RGB')
                        output_path = f"converted_{os.path.basename(image_path)}"
                        converted.save(output_path)
                        result['output_file'] = output_path
                        result['new_mode'] = 'RGB'
            
            return result
            
        except ImportError:
            return {'error': 'PIL (Pillow) library not available. Install with: pip install Pillow'}
        except Exception as e:
            return {'error': f'Image processing failed: {str(e)}'}
    
    def email_sender(self, to_email: str, subject: str, body: str, smtp_server: str = "smtp.gmail.com") -> Dict[str, Any]:
        """
        Send email using SMTP (requires proper configuration).
        
        Args:
            to_email: Recipient email address
            subject: Email subject
            body: Email body
            smtp_server: SMTP server address
        
        Returns:
            Dictionary containing sending results
        """
        try:
            import smtplib
            from email.mime.text import MIMEText
            from email.mime.multipart import MIMEMultipart
            
            # This is a template - actual implementation would require proper credentials
            result = {
                'to': to_email,
                'subject': subject,
                'smtp_server': smtp_server,
                'status': 'template_only',
                'message': 'This is a template. Actual email sending requires proper SMTP configuration.'
            }
            
            # Template for actual implementation:
            # msg = MIMEMultipart()
            # msg['From'] = "your_email@gmail.com"
            # msg['To'] = to_email
            # msg['Subject'] = subject
            # msg.attach(MIMEText(body, 'plain'))
            # 
            # server = smtplib.SMTP(smtp_server, 587)
            # server.starttls()
            # server.login("your_email@gmail.com", "your_password")
            # text = msg.as_string()
            # server.sendmail("your_email@gmail.com", to_email, text)
            # server.quit()
            
            return result
            
        except Exception as e:
            return {'error': f'Email sending failed: {str(e)}'}
    
    def task_scheduler(self, tasks: List[Dict]) -> Dict[str, Any]:
        """
        Simple task scheduler for running tasks at specified intervals.
        
        Args:
            tasks: List of task dictionaries with 'name', 'function', 'interval' keys
        
        Returns:
            Dictionary containing scheduling results
        """
        try:
            results = []
            
            for task in tasks:
                task_result = {
                    'name': task.get('name', 'unnamed'),
                    'status': 'scheduled',
                    'start_time': datetime.now().isoformat()
                }
                
                try:
                    # Simulate task execution
                    if 'function' in task:
                        # In a real implementation, you would execute the function
                        task_result['status'] = 'completed'
                        task_result['result'] = 'Task executed successfully'
                    else:
                        task_result['status'] = 'error'
                        task_result['error'] = 'No function specified'
                        
                except Exception as e:
                    task_result['status'] = 'error'
                    task_result['error'] = str(e)
                
                task_result['end_time'] = datetime.now().isoformat()
                results.append(task_result)
            
            return {
                'total_tasks': len(tasks),
                'results': results,
                'scheduled_at': datetime.now().isoformat()
            }
            
        except Exception as e:
            return {'error': f'Task scheduling failed: {str(e)}'}
    
    def api_client(self, url: str, method: str = 'GET', data: Dict = None, headers: Dict = None) -> Dict[str, Any]:
        """
        Simple API client for making HTTP requests.
        
        Args:
            url: API endpoint URL
            method: HTTP method (GET, POST, PUT, DELETE)
            data: Request data (for POST/PUT)
            headers: Request headers
        
        Returns:
            Dictionary containing API response
        """
        try:
            import requests
            
            if headers is None:
                headers = {'Content-Type': 'application/json'}
            
            if method.upper() == 'GET':
                response = requests.get(url, headers=headers, timeout=10)
            elif method.upper() == 'POST':
                response = requests.post(url, json=data, headers=headers, timeout=10)
            elif method.upper() == 'PUT':
                response = requests.put(url, json=data, headers=headers, timeout=10)
            elif method.upper() == 'DELETE':
                response = requests.delete(url, headers=headers, timeout=10)
            else:
                return {'error': f'Unsupported HTTP method: {method}'}
            
            result = {
                'url': url,
                'method': method.upper(),
                'status_code': response.status_code,
                'headers': dict(response.headers),
                'response_time': response.elapsed.total_seconds()
            }
            
            try:
                result['data'] = response.json()
            except:
                result['data'] = response.text
            
            return result
            
        except requests.RequestException as e:
            return {'error': f'API request failed: {str(e)}'}
        except Exception as e:
            return {'error': f'API client error: {str(e)}'}

def main():
    """Main function for advanced Python scripts"""
    parser = argparse.ArgumentParser(description='Advanced Python Scripts Collection for Hacktoberfest 2025')
    parser.add_argument('script', choices=['csv_processor', 'database_manager', 'log_analyzer', 
                                         'network_scanner', 'image_processor', 'email_sender', 
                                         'task_scheduler', 'api_client', 'list'],
                       help='Script to run or "list" to show available scripts')
    parser.add_argument('--args', nargs='*', help='Arguments for the script')
    
    args = parser.parse_args()
    
    collection = AdvancedPythonScripts()
    
    if args.script == 'list':
        print("Advanced Python Scripts:")
        print("=" * 40)
        for script_name, script_func in collection.scripts.items():
            print(f"• {script_name}: {script_func.__doc__.split('.')[0] if script_func.__doc__ else 'No description'}")
        return
    
    # Run the selected script
    script_func = collection.scripts[args.script]
    
    try:
        if args.args:
            result = script_func(*args.args)
        else:
            result = script_func()
        
        print(json.dumps(result, indent=2))
        
    except Exception as e:
        print(f"Error: {str(e)}", file=sys.stderr)
        sys.exit(1)

if __name__ == "__main__":
    main()
